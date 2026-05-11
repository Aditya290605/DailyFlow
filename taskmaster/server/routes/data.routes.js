const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const Bucket = require('../models/Bucket');
const DailyStat = require('../models/DailyStat');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production';

// ─── Helpers ────────────────────────────────────────────────────────────────

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

const getTodayString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

/**
 * Auto-record or update a DailyStat entry for today whenever a task is completed.
 * This replaces the old manual "Submit Day" flow.
 */
const recordDailyCompletion = async (userId) => {
    const dateString = getTodayString();
    const allTasks = await Task.find({ userId });
    const totalTasks = allTasks.length;
    const tasksCompleted = allTasks.filter(t => t.completed).length;
    const percentage = totalTasks === 0 ? 0 : Math.round((tasksCompleted / totalTasks) * 100);

    await DailyStat.findOneAndUpdate(
        { userId, date: dateString },
        { tasksCompleted, totalTasks, percentage },
        { upsert: true, new: true }
    );

    // Recompute streaks
    const allStats = await DailyStat.find({ userId }).sort({ date: -1 });
    const submittedDates = new Set(allStats.map(s => s.date));

    let currentStreak = 0;
    let checkDate = new Date();
    while (true) {
        const y = checkDate.getFullYear();
        const m = String(checkDate.getMonth() + 1).padStart(2, '0');
        const d = String(checkDate.getDate()).padStart(2, '0');
        if (submittedDates.has(`${y}-${m}-${d}`)) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }

    let longestStreak = 0;
    let tempStreak = 0;
    const sortedDates = [...submittedDates].sort();
    for (let i = 0; i < sortedDates.length; i++) {
        if (i === 0) {
            tempStreak = 1;
        } else {
            const prev = new Date(sortedDates[i - 1] + 'T00:00:00');
            const curr = new Date(sortedDates[i] + 'T00:00:00');
            const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
            tempStreak = diffDays === 1 ? tempStreak + 1 : 1;
        }
        longestStreak = Math.max(longestStreak, tempStreak);
    }

    const user = await User.findById(userId);
    user.metrics = {
        currentStreak,
        longestStreak,
        totalCompletedDays: allStats.length,
        lastSubmissionDate: dateString
    };
    await user.save();
};

// ═══════════════════════════════════════════════════════════════════════════
// BUCKET ROUTES
// ═══════════════════════════════════════════════════════════════════════════

// @route   GET /api/data/buckets
// @desc    Get all buckets for user (with task counts)
// @access  Private
router.get('/buckets', auth, async (req, res) => {
    try {
        const buckets = await Bucket.find({ userId: req.user.id }).sort({ position: 1, createdAt: 1 });

        // If user has no buckets, seed 3 defaults
        if (buckets.length === 0) {
            const defaults = ['To Do', 'In Progress', 'Done'];
            const created = [];
            for (let i = 0; i < defaults.length; i++) {
                const b = new Bucket({ userId: req.user.id, name: defaults[i], position: i });
                await b.save();
                created.push(b);
            }

            // Migrate any existing tasks (without bucketId) into the first bucket
            await Task.updateMany(
                { userId: req.user.id, bucketId: null },
                { $set: { bucketId: created[0]._id } }
            );

            return res.json(created);
        }

        res.json(buckets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/data/buckets
// @desc    Create a new bucket
// @access  Private
router.post('/buckets', auth, async (req, res) => {
    const { name, color } = req.body;
    try {
        const highest = await Bucket.findOne({ userId: req.user.id }).sort({ position: -1 });
        const position = highest ? highest.position + 1 : 0;

        const bucket = new Bucket({ userId: req.user.id, name, position, color: color || null });
        await bucket.save();
        res.json(bucket);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/data/buckets/:id
// @desc    Update a bucket (rename / reorder)
// @access  Private
router.put('/buckets/:id', auth, async (req, res) => {
    const { name, position, color } = req.body;
    try {
        let bucket = await Bucket.findById(req.params.id);
        if (!bucket) return res.status(404).json({ msg: 'Bucket not found' });
        if (bucket.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        if (name !== undefined) bucket.name = name;
        if (position !== undefined) bucket.position = position;
        if (color !== undefined) bucket.color = color;
        await bucket.save();
        res.json(bucket);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/data/buckets/:id
// @desc    Delete a bucket (and all its tasks)
// @access  Private
router.delete('/buckets/:id', auth, async (req, res) => {
    try {
        const bucket = await Bucket.findById(req.params.id);
        if (!bucket) return res.status(404).json({ msg: 'Bucket not found' });
        if (bucket.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        await Task.deleteMany({ userId: req.user.id, bucketId: req.params.id });
        await Bucket.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Bucket and its tasks deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// TASK ROUTES
// ═══════════════════════════════════════════════════════════════════════════

// @route   GET /api/data/tasks
// @desc    Get all tasks for user (flat, with bucketId)
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
// @desc    Add a new task to a bucket
// @access  Private
router.post('/tasks', auth, async (req, res) => {
    const { text, bucketId } = req.body;
    try {
        // Validate bucket ownership
        if (bucketId) {
            const bucket = await Bucket.findById(bucketId);
            if (!bucket || bucket.userId.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'Invalid bucket' });
            }
        }

        const highestTask = await Task.findOne({ userId: req.user.id, bucketId: bucketId || null }).sort({ position: -1 });
        const position = highestTask ? highestTask.position + 1 : 0;

        const newTask = new Task({ text, userId: req.user.id, bucketId: bucketId || null, position });
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/data/tasks/:id
// @desc    Update a task (toggle complete, edit text)
// @access  Private
router.put('/tasks/:id', auth, async (req, res) => {
    const { text, completed } = req.body;

    const taskFields = {};
    if (text !== undefined) taskFields.text = text;
    if (completed !== undefined) taskFields.completed = completed;

    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        if (task.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true });

        // Auto-record daily stat whenever completion state changes
        if (completed !== undefined) {
            await recordDailyCompletion(req.user.id);
        }

        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/data/tasks/:id/move
// @desc    Move a task to a different bucket (with new position)
// @access  Private
router.put('/tasks/:id/move', auth, async (req, res) => {
    const { targetBucketId, position } = req.body;
    try {
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        if (task.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        // Validate target bucket
        const bucket = await Bucket.findById(targetBucketId);
        if (!bucket || bucket.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Invalid target bucket' });
        }

        task = await Task.findByIdAndUpdate(
            req.params.id,
            { $set: { bucketId: targetBucketId, position: position ?? task.position } },
            { new: true }
        );
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/data/tasks/reorder
// @desc    Reorder tasks within or across buckets (batch update)
// @access  Private
router.put('/tasks/reorder', auth, async (req, res) => {
    const { tasks } = req.body; // Array of { id, position, bucketId }
    try {
        const updatePromises = tasks.map(({ id, position, bucketId }) => {
            const update = { position };
            if (bucketId !== undefined) update.bucketId = bucketId;
            return Task.findOneAndUpdate(
                { _id: id, userId: req.user.id },
                update,
                { new: true }
            );
        });
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
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        if (task.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ═══════════════════════════════════════════════════════════════════════════
// ANALYTICS
// ═══════════════════════════════════════════════════════════════════════════

// @route   GET /api/data/analytics
// @desc    Get user contribution stats and metrics
// @access  Private
router.get('/analytics', auth, async (req, res) => {
    try {
        const stats = await DailyStat.find({ userId: req.user.id }).sort({ date: 1 });
        const submittedDates = new Set(stats.map(s => s.date));

        // Current streak
        let currentStreak = 0;
        let checkDate = new Date();
        while (true) {
            const y = checkDate.getFullYear();
            const m = String(checkDate.getMonth() + 1).padStart(2, '0');
            const d = String(checkDate.getDate()).padStart(2, '0');
            if (submittedDates.has(`${y}-${m}-${d}`)) {
                currentStreak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }

        // Longest streak
        let longestStreak = 0;
        let tempStreak = 0;
        const sortedDates = [...submittedDates].sort();
        for (let i = 0; i < sortedDates.length; i++) {
            if (i === 0) {
                tempStreak = 1;
            } else {
                const prev = new Date(sortedDates[i - 1] + 'T00:00:00');
                const curr = new Date(sortedDates[i] + 'T00:00:00');
                const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
                tempStreak = diffDays === 1 ? tempStreak + 1 : 1;
            }
            longestStreak = Math.max(longestStreak, tempStreak);
        }

        res.json({
            stats,
            metrics: { currentStreak, longestStreak, totalCompletedDays: stats.length }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Keep legacy day-submission route for backward compat (no-op if already recorded today)
router.post('/day-submission', auth, async (req, res) => {
    try {
        await recordDailyCompletion(req.user.id);
        const user = await User.findById(req.user.id);
        res.json({ msg: 'Day recorded', metrics: user.metrics });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
