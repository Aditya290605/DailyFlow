const mongoose = require('mongoose');

const BucketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
        default: null // Optional accent color hex
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

BucketSchema.index({ userId: 1, position: 1 });

module.exports = mongoose.model('Bucket', BucketSchema);
