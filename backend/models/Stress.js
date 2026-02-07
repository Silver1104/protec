import mongoose from 'mongoose';

const stressSchema = new mongoose.Schema({
    targetName: {
        type: String,
        required: true,
    },
    hits: {
        type: Number,
        default: 0,
    },
    lastHitAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Stress', stressSchema);
