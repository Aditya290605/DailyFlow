const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    metrics: {
        currentStreak: { type: Number, default: 0 },
        longestStreak: { type: Number, default: 0 },
        totalCompletedDays: { type: Number, default: 0 },
        lastSubmissionDate: { type: String, default: null } // YYYY-MM-DD
    }
});

module.exports = mongoose.model('User', UserSchema);
