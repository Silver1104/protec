import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useCurrentDay } from '../../hooks/useCurrentDay';

export const Header = () => {
    const currentDay = useCurrentDay();

    return (
        <header className="bg-gradient-to-r from-valentine-500 to-valentine-600 text-white py-4 px-6 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <Heart size={32} fill="white" />
                    </motion.div>
                    <h1 className="text-2xl font-bold font-display">Valentine Week 2026</h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-right"
                >
                    <p className="text-sm opacity-90">Today is</p>
                    <p className="text-xl font-semibold">
                        {currentDay.emoji} {currentDay.name}
                    </p>
                </motion.div>
            </div>
        </header>
    );
};
