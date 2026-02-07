import mongoose from 'mongoose';

const hugSchema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0,
    },
    lastHugDate: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Hug', hugSchema);
