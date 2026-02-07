import express from 'express';
import Video from '../models/Video.js';

const router = express.Router();

// @route   POST /api/video/watch
// @desc    Track video watch
// @access  Public
router.post('/watch', async (req, res) => {
    try {
        let video = await Video.findOne();

        if (!video) {
            video = await Video.create({
                watched: true,
                watchCount: 1,
                lastWatchedAt: new Date(),
            });
        } else {
            video.watched = true;
            video.watchCount += 1;
            video.lastWatchedAt = new Date();
            await video.save();
        }

        res.json(video);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/video
// @desc    Get video stats
// @access  Public
router.get('/', async (req, res) => {
    try {
        const video = await Video.findOne();
        res.json(video || { watched: false, watchCount: 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
