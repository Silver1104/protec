import express from 'express';
import Bear from '../models/Bear.js';

const router = express.Router();

// @route   POST /api/bear
// @desc    Create/update bear customization
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { bodyColor, shirtColor, pantsColor, shoesColor, accessory, name } = req.body;

        // Delete previous bear
        await Bear.deleteMany({});

        const bear = await Bear.create({
            bodyColor,
            shirtColor,
            pantsColor,
            shoesColor,
            accessory,
            name,
        });

        res.status(201).json(bear);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/bear
// @desc    Get current bear customization
// @access  Public
router.get('/', async (req, res) => {
    try {
        const bear = await Bear.findOne().sort({ timestamp: -1 });
        res.json(bear);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
