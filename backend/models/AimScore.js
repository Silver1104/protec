import mongoose from 'mongoose';

const aimScoreSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true,
    },
    accuracy: {
        type: Number,
        default: 0,
    },
    duration: {
        type: Number, // in seconds
        default: 30,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('AimScore', aimScoreSchema);
