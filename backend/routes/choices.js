import express from 'express';
import Choice from '../models/Choice.js';

const router = express.Router();

// @route   POST /api/choices
// @desc    Save chocolate or kiss choice
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { day, choice } = req.body;

        // Delete previous choice for this day
        await Choice.deleteMany({ day });

        const newChoice = await Choice.create({ day, choice });

        res.status(201).json(newChoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/choices/:day
// @desc    Get choice for a specific day
// @access  Public
router.get('/:day', async (req, res) => {
    try {
        const choice = await Choice.findOne({ day: req.params.day }).sort({ timestamp: -1 });
        res.json(choice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/choices
// @desc    Get all choices
// @access  Public
router.get('/', async (req, res) => {
    try {
        const choices = await Choice.find().sort({ timestamp: -1 });
        res.json(choices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
