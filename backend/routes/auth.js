import express from 'express';
import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';

const router = express.Router();

// @route POST /api/auth/register
// @desc Register admin (only run once)
// @access Public (should be protected in production)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: 'admin',
        });

        const token = generateToken(user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route POST /api/auth/login
// @desc Login admin
// @access Public
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login attempt for:', email); // Debug log

        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found'); // Debug log
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await user.comparePassword(password);
        console.log('Password valid:', isPasswordValid); // Debug log

        if (isPasswordValid) {
            const token = generateToken(user._id);

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
