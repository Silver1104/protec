import mongoose from 'mongoose';

const periodSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    cycleLength: {
        type: Number, // in days
    },
    symptoms: [{
        type: String,
    }],
    mood: {
        type: String,
        enum: ['happy', 'sad', 'angry', 'anxious', 'normal'],
    },
    notes: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Period', periodSchema);
