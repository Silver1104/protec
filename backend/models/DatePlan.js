import mongoose from 'mongoose';

const datePlanSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    activity: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        default: '',
    },
    notes: {
        type: String,
        default: '',
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('DatePlan', datePlanSchema);
