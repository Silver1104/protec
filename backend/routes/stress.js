import express from 'express';
import Stress from '../models/Stress.js';

const router = express.Router();

// @route   POST /api/stress/hit
// @desc    Record a hit
// @access  Public
router.post('/hit', async (req, res) => {
    try {
        const { targetName } = req.body;

        let stress = await Stress.findOne({ targetName });

        if (!stress) {
            stress = await Stress.create({
                targetName,
                hits: 1,
            });
        } else {
            stress.hits += 1;
            stress.lastHitAt = new Date();
            await stress.save();
        }

        res.json(stress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/stress
// @desc    Get all stress targets
// @access  Public
router.get('/', async (req, res) => {
    try {
        const stressTargets = await Stress.find().sort({ hits: -1 });
        res.json(stressTargets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
