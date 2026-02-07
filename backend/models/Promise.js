import mongoose from 'mongoose';

const promiseSchema = new mongoose.Schema({
    read: {
        type: Boolean,
        default: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Promise', promiseSchema);
