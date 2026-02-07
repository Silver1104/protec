import express from 'express';
import Promise from '../models/Promise.js';

const router = express.Router();

// @route   POST /api/promises/read
// @desc    Mark promises as read
// @access  Public
router.post('/read', async (req, res) => {
    try {
        const promise = await Promise.create({ read: true });
        res.status(201).json(promise);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/promises
// @desc    Get promise read status
// @access  Public
router.get('/', async (req, res) => {
    try {
        const promises = await Promise.find().sort({ timestamp: -1 });
        res.json(promises);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
