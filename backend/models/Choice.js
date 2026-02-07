import mongoose from 'mongoose';

const choiceSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        enum: ['chocolate', 'kiss'],
    },
    choice: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Choice', choiceSchema);
