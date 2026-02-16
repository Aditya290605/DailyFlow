const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    lastCompletedDate: {
        type: String,
        default: null
    },
    position: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema);
