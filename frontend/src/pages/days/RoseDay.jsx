import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hearts } from '../../components/animations/Hearts';

export const RoseDay = () => {
    const [petals, setPetals] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setPetals((prev) => (prev > 0 ? prev - 1 : 5));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-pink-100 py-12 px-4 relative overflow-hidden">
            <Hearts count={15} />

            <div className="container mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-display text-red-600 mb-8"
                >
                    🌹 Rose Day 🌹
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto"
                >
                    Like the enchanted rose from Beauty and the Beast,
                    my love for you will never fade...
                </motion.p>

                {/* Pixelated Rose Animation */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 0.8, rotate: { repeat: Infinity, duration: 2 } }}
                        className="relative"
                    >
                        {/* Glass Dome */}
                        <svg width="300" height="400" viewBox="0 0 300 400" className="filter drop-shadow-2xl">
                            {/* Dome */}
                            <ellipse cx="150" cy="100" rx="100" ry="40" fill="rgba(200, 230, 255, 0.3)" stroke="#a0c4ff" strokeWidth="2" />
                            <rect x="50" y="100" width="200" height="180" fill="rgba(200, 230, 255, 0.2)" stroke="#a0c4ff" strokeWidth="2" />
                            <ellipse cx="150" cy="280" rx="100" ry="40" fill="rgba(200, 230, 255, 0.3)" stroke="#a0c4ff" strokeWidth="2" />

                            {/* Base */}
                            <rect x="80" y="280" width="140" height="20" fill="#8B4513" stroke="#654321" strokeWidth="2" />
                            <rect x="100" y="300" width="100" height="10" fill="#654321" />

                            {/* Rose Stem */}
                            <line x1="150" y1="180" x2="150" y2="270" stroke="#2d5016" strokeWidth="4" />

                            {/* Leaves */}
                            <motion.ellipse
                                cx="140"
                                cy="220"
                                rx="15"
                                ry="8"
                                fill="#4a7c30"
                                animate={{ rotate: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            />
                            <motion.ellipse
                                cx="160"
                                cy="240"
                                rx="15"
                                ry="8"
                                fill="#4a7c30"
                                animate={{ rotate: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                            />

                            {/* Rose Bloom - Pixelated Style */}
                            <g style={{ imageRendering: 'pixelated' }}>
                                {/* Outer petals */}
                                {Array.from({ length: petals }).map((_, i) => (
                                    <motion.ellipse
                                        key={i}
                                        cx={150 + Math.cos((i * Math.PI * 2) / 5) * 30}
                                        cy={180 + Math.sin((i * Math.PI * 2) / 5) * 30}
                                        rx="20"
                                        ry="30"
                                        fill="#e63946"
                                        stroke="#c1121f"
                                        strokeWidth="2"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: i * 0.2 }}
                                    />
                                ))}

                                {/* Inner petals */}
                                <motion.circle
                                    cx="150"
                                    cy="180"
                                    r="15"
                                    fill="#780000"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                />
                                <circle cx="150" cy="180" r="8" fill="#590000" />
                            </g>

                            {/* Fallen petals */}
                            <motion.ellipse
                                cx="120"
                                cy="275"
                                rx="8"
                                ry="12"
                                fill="#e63946"
                                opacity="0.6"
                                animate={{ y: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                            />
                            <motion.ellipse
                                cx="180"
                                cy="278"
                                rx="8"
                                ry="12"
                                fill="#e63946"
                                opacity="0.6"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                            />
                        </svg>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
                >
                    <p className="text-2xl font-display text-red-600 mb-4">
                        "A rose by any other name would smell as sweet"
                    </p>
                    <p className="text-lg text-gray-700">
                        But you, my love, are sweeter than any rose in existence.
                        This enchanted rose represents my eternal love for you. ❤️
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
