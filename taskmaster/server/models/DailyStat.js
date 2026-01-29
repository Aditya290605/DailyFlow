const mongoose = require('mongoose');

const DailyStatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String, // YYYY-MM-DD
        required: true
    },
    tasksCompleted: {
        type: Number,
        required: true,
        default: 0
    },
    totalTasks: {
        type: Number,
        required: true,
        default: 0
    },
    percentage: {
        type: Number,
        required: true,
        default: 0
    }
});

// Ensure only one stat per day per user
DailyStatSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('DailyStat', DailyStatSchema);
