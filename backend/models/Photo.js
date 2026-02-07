import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        default: '',
    },
    category: {
        type: String,
        enum: ['personal', 'us', 'memories'],
        default: 'us',
    },
    starred: {
        type: Boolean,
        default: false,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Photo', photoSchema);
