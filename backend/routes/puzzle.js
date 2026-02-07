import express from 'express';
import Puzzle from '../models/Puzzle.js';

const router = express.Router();

// @route   POST /api/puzzle/complete
// @desc    Mark puzzle as completed
// @access  Public
router.post('/complete', async (req, res) => {
    try {
        const { moves } = req.body;

        const puzzle = await Puzzle.create({
            completed: true,
            moves,
            completedAt: new Date(),
        });

        res.status(201).json(puzzle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/puzzle
// @desc    Get puzzle status
// @access  Public
router.get('/', async (req, res) => {
    try {
        const puzzle = await Puzzle.findOne().sort({ completedAt: -1 });
        res.json(puzzle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
