import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    watched: {
        type: Boolean,
        default: false,
    },
    watchCount: {
        type: Number,
        default: 0,
    },
    lastWatchedAt: {
        type: Date,
    },
});

export default mongoose.model('Video', videoSchema);
