import express from 'express';
import DatePlan from '../models/DatePlan.js';

const router = express.Router();

// @route   POST /api/dateplan
// @desc    Create date plan
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { date, time, activity, place, notes } = req.body;

        const datePlan = await DatePlan.create({
            date,
            time,
            activity,
            place,
            notes,
        });

        res.status(201).json(datePlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/dateplan
// @desc    Get all date plans
// @access  Public
router.get('/', async (req, res) => {
    try {
        const datePlans = await DatePlan.find().sort({ date: 1 });
        res.json(datePlans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/dateplan/:id
// @desc    Update date plan
// @access  Public
router.put('/:id', async (req, res) => {
    try {
        const datePlan = await DatePlan.findById(req.params.id);

        if (datePlan) {
            datePlan.date = req.body.date || datePlan.date;
            datePlan.time = req.body.time || datePlan.time;
            datePlan.activity = req.body.activity || datePlan.activity;
            datePlan.place = req.body.place || datePlan.place;
            datePlan.notes = req.body.notes || datePlan.notes;
            datePlan.completed = req.body.completed !== undefined ? req.body.completed : datePlan.completed;

            const updatedDatePlan = await datePlan.save();
            res.json(updatedDatePlan);
        } else {
            res.status(404).json({ message: 'Date plan not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/dateplan/:id
// @desc    Delete date plan
// @access  Public
router.delete('/:id', async (req, res) => {
    try {
        const datePlan = await DatePlan.findById(req.params.id);

        if (datePlan) {
            await datePlan.deleteOne();
            res.json({ message: 'Date plan removed' });
        } else {
            res.status(404).json({ message: 'Date plan not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
