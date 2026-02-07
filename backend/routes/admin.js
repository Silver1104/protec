import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import Choice from '../models/Choice.js';
import Bear from '../models/Bear.js';
import Promise from '../models/Promise.js';
import Hug from '../models/Hug.js';
import Puzzle from '../models/Puzzle.js';
import Video from '../models/Video.js';
import Stress from '../models/Stress.js';
import Photo from '../models/Photo.js';
import DatePlan from '../models/DatePlan.js';
import AimScore from '../models/AimScore.js';
import Period from '../models/Period.js';

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get all data for admin dashboard
// @access  Private/Admin
router.get('/dashboard', protect, admin, async (req, res) => {
    try {
        const [
            choices,
            bear,
            promises,
            hugs,
            puzzle,
            video,
            stress,
            photos,
            datePlans,
            aimScores,
            periods,
        ] = await Promise.all([
            Choice.find().sort({ timestamp: -1 }),
            Bear.findOne().sort({ timestamp: -1 }),
            Promise.find().sort({ timestamp: -1 }),
            Hug.findOne(),
            Puzzle.findOne().sort({ completedAt: -1 }),
            Video.findOne(),
            Stress.find().sort({ hits: -1 }),
            Photo.find().sort({ uploadedAt: -1 }),
            DatePlan.find().sort({ date: 1 }),
            AimScore.find().sort({ score: -1 }).limit(5),
            Period.find().sort({ startDate: -1 }).limit(5),
        ]);

        res.json({
            choices,
            bear,
            promises,
            hugs: hugs || { count: 0 },
            puzzle,
            video: video || { watched: false, watchCount: 0 },
            stress,
            photos,
            datePlans,
            aimScores,
            periods,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
