import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@example.com' });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('Email:', existingAdmin.email);
            process.exit(0);
        }

        // Create admin user
        const admin = await User.create({
            name: 'Admin',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin',
        });

        console.log('✓ Admin user created successfully!');
        console.log('Email:', admin.email);
        console.log('Password: admin123');
        console.log('');
        console.log('You can now login at: http://localhost:5173/admin/login');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

createAdmin();
