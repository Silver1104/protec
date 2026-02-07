import express from 'express';
import AimScore from '../models/AimScore.js';

const router = express.Router();

// @route   POST /api/aimscore
// @desc    Save aim score
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { score, accuracy, duration } = req.body;

        const aimScore = await AimScore.create({
            score,
            accuracy,
            duration,
        });

        res.status(201).json(aimScore);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/aimscore
// @desc    Get all aim scores
// @access  Public
router.get('/', async (req, res) => {
    try {
        const aimScores = await AimScore.find().sort({ score: -1 }).limit(10);
        res.json(aimScores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/aimscore/highscore
// @desc    Get highest score
// @access  Public
router.get('/highscore', async (req, res) => {
    try {
        const highScore = await AimScore.findOne().sort({ score: -1 });
        res.json(highScore || { score: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
