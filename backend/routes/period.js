import express from 'express';
import Period from '../models/Period.js';

const router = express.Router();

// @route   POST /api/period
// @desc    Add period entry
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { startDate, endDate, cycleLength, symptoms, mood, notes } = req.body;

        const period = await Period.create({
            startDate,
            endDate,
            cycleLength,
            symptoms,
            mood,
            notes,
        });

        res.status(201).json(period);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/period
// @desc    Get all period entries
// @access  Public
router.get('/', async (req, res) => {
    try {
        const periods = await Period.find().sort({ startDate: -1 });
        res.json(periods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/period/:id
// @desc    Update period entry
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const period = await Period.findById(req.params.id);

        if (period) {
            period.startDate = req.body.startDate || period.startDate;
            period.endDate = req.body.endDate || period.endDate;
            period.cycleLength = req.body.cycleLength || period.cycleLength;
            period.symptoms = req.body.symptoms || period.symptoms;
            period.mood = req.body.mood || period.mood;
            period.notes = req.body.notes || period.notes;

            const updatedPeriod = await period.save();
            res.json(updatedPeriod);
        } else {
            res.status(404).json({ message: 'Period entry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/period/:id
// @desc    Delete period entry
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const period = await Period.findById(req.params.id);

        if (period) {
            await period.deleteOne();
            res.json({ message: 'Period entry removed' });
        } else {
            res.status(404).json({ message: 'Period entry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
