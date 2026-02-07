import mongoose from 'mongoose';

const bearSchema = new mongoose.Schema({
    bodyColor: {
        type: String,
        default: 'brown',
    },
    shirtColor: {
        type: String,
        default: 'red',
    },
    pantsColor: {
        type: String,
        default: 'blue',
    },
    shoesColor: {
        type: String,
        default: 'black',
    },
    accessory: {
        type: String,
        enum: ['none', 'hat', 'glasses', 'bowtie', 'scarf'],
        default: 'none',
    },
    name: {
        type: String,
        default: '',
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Bear', bearSchema);
