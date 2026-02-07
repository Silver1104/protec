import express from 'express';
import Photo from '../models/Photo.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/photos
// @desc    Upload photo (admin only)
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { url, caption, category, starred } = req.body;

        const photo = await Photo.create({
            url,
            caption,
            category,
            starred,
        });

        res.status(201).json(photo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/photos
// @desc    Get all photos
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category } = req.query;
        const filter = category ? { category } : {};

        const photos = await Photo.find(filter).sort({ uploadedAt: -1 });
        res.json(photos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/photos/:id
// @desc    Update photo
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);

        if (photo) {
            photo.caption = req.body.caption || photo.caption;
            photo.starred = req.body.starred !== undefined ? req.body.starred : photo.starred;

            const updatedPhoto = await photo.save();
            res.json(updatedPhoto);
        } else {
            res.status(404).json({ message: 'Photo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/photos/:id
// @desc    Delete photo
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);

        if (photo) {
            await photo.deleteOne();
            res.json({ message: 'Photo removed' });
        } else {
            res.status(404).json({ message: 'Photo not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
