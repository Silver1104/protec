import mongoose from 'mongoose';

const puzzleSchema = new mongoose.Schema({
    completed: {
        type: Boolean,
        default: false,
    },
    moves: {
        type: Number,
        default: 0,
    },
    completedAt: {
        type: Date,
    },
});

export default mongoose.model('Puzzle', puzzleSchema);
