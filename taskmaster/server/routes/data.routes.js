const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const DailyStat = require('../models/DailyStat');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// @route   GET /api/data/tasks
// @desc    Get all user tasks
// @access  Private
router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id }).sort({ position: 1, createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/data/tasks
// @desc    Add a new task
// @access  Private
router.post('/tasks', auth, async (req, res) => {
    const { text } = req.body;
    try {
        // Get the highest position and add 1
        const highestTask = await Task.findOne({ userId: req.user.id }).sort({ position: -1 });
        const newPosition = highestTask ? highestTask.position + 1 : 0;

        const newTask = new Task({
            text,
            userId: req.user.id,
            position: newPosition
        });
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/data/tasks/:id
// @desc    Update a task (toggle complete or edit text)
// @access  Private
router.put('/tasks/:id', auth, async (req, res) => {
    const { text, completed } = req.body;

    // Build object to update
    const taskFields = {};
    if (text !== undefined) taskFields.text = text;
    if (completed !== undefined) taskFields.completed = completed;

    try {
        let task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ msg: 'Task not found' });

        // Ensure user owns task
        if (task.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: taskFields },
            { new: true }
        );

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/data/tasks/reorder
// @desc    Reorder tasks (update positions)
// @access  Private
router.put('/tasks/reorder', auth, async (req, res) => {
    const { tasks } = req.body; // Array of {id, position}

    try {
        // Update each task's position
        const updatePromises = tasks.map(({ id, position }) =>
            Task.findOneAndUpdate(
                { _id: id, userId: req.user.id },
                { position },
                { new: true }
            )
        );

        const updatedTasks = await Promise.all(updatePromises);
        res.json(updatedTasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/data/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ msg: 'Task not found' });

        // Ensure user owns task
        if (task.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Task.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/data/day-submission
// @desc    Submit daily progress and update streaks
// @access  Private
router.post('/day-submission', auth, async (req, res) => {
    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;

        // Check if already submitted for today
        const existingStat = await DailyStat.findOne({ userId: req.user.id, date: dateString });
        if (existingStat) {
            return res.status(400).json({ msg: 'Day already submitted' });
        }

        // Calculate progress from current tasks
        const tasks = await Task.find({ userId: req.user.id });
        const totalTasks = tasks.length;
        const tasksCompleted = tasks.filter(t => t.completed).length;
        const percentage = totalTasks === 0 ? 0 : Math.round((tasksCompleted / totalTasks) * 100);

        // Create DailyStat
        const newStat = new DailyStat({
            userId: req.user.id,
            date: dateString,
            tasksCompleted,
            totalTasks,
            percentage
        });
        await newStat.save();

        // Update User Metrics (Streak Logic)
        const user = await User.findById(req.user.id);

        let { currentStreak, longestStreak, totalCompletedDays, lastSubmissionDate } = user.metrics || { currentStreak: 0, longestStreak: 0, totalCompletedDays: 0, lastSubmissionDate: null };

        // Check difference in days to determine streak
        if (lastSubmissionDate) {
            const lastDate = new Date(lastSubmissionDate);
            const diffTime = Math.abs(today - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Consecutive day
                currentStreak += 1;
            } else if (diffDays > 1) {
                // Broken streak
                currentStreak = 1;
            }
            // If diffDays === 0 (same day), logic above handles "already submitted" check, 
            // but just in case, we wouldn't increment.
        } else {
            // First submission ever
            currentStreak = 1;
        }

        // Update longest streak
        if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
        }

        totalCompletedDays += 1;

        user.metrics = {
            currentStreak,
            longestStreak,
            totalCompletedDays,
            lastSubmissionDate: dateString
        };

        await user.save();

        res.json({ msg: 'Day submitted successfully', stat: newStat, metrics: user.metrics });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/data/analytics
// @desc    Get user contribution stats and metrics
// @access  Private
router.get('/analytics', auth, async (req, res) => {
    try {
        const stats = await DailyStat.find({ userId: req.user.id }).sort({ date: 1 });
        const user = await User.findById(req.user.id).select('metrics');

        res.json({
            stats,
            metrics: user.metrics || { currentStreak: 0, longestStreak: 0, totalCompletedDays: 0 }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
