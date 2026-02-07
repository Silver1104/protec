import express from 'express';
import Hug from '../models/Hug.js';

const router = express.Router();

// @route   POST /api/hugs
// @desc    Increment hug count
// @access  Public
router.post('/', async (req, res) => {
    try {
        let hug = await Hug.findOne();

        if (!hug) {
            hug = await Hug.create({ count: 1 });
        } else {
            hug.count += 1;
            hug.lastHugDate = new Date();
            await hug.save();
        }

        res.json(hug);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/hugs
// @desc    Get hug count
// @access  Public
router.get('/', async (req, res) => {
    try {
        const hug = await Hug.findOne();
        res.json(hug || { count: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
