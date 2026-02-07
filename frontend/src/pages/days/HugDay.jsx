import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { hugsAPI } from '../../utils/api';
import toast from 'react-hot-toast';

export const HugDay = () => {
    const [hugCount, setHugCount] = useState(0);
    const [isHugging, setIsHugging] = useState(false);
    const [showHearts, setShowHearts] = useState(false);

    useEffect(() => {
        loadHugCount();
    }, []);

    const loadHugCount = async () => {
        try {
            const res = await hugsAPI.get();
            setHugCount(res.data.count || 0);
        } catch (error) {
            console.error(error);
        }
    };

    const sendHug = async () => {
        setIsHugging(true);
        setShowHearts(true);

        try {
            const res = await hugsAPI.increment();
            setHugCount(res.data.count);
            toast.success('Virtual hug sent! 🤗', {
                icon: '💕',
            });
        } catch (error) {
            console.error(error);
            toast.error('Failed to send hug');
        }

        setTimeout(() => {
            setIsHugging(false);
            setTimeout(() => setShowHearts(false), 1000);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 py-12 px-4 relative overflow-hidden">
            {/* Floating Hearts Animation */}
            <AnimatePresence>
                {showHearts && (
                    <div className="fixed inset-0 pointer-events-none z-10">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-4xl"
                                initial={{
                                    x: Math.random() * window.innerWidth,
                                    y: window.innerHeight,
                                    scale: 0,
                                    opacity: 0,
                                }}
                                animate={{
                                    y: -100,
                                    scale: 1,
                                    opacity: [0, 1, 1, 0],
                                }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 3,
                                    delay: i * 0.1,
                                }}
                            >
                                {['❤️', '💕', '💖', '💗', '💙'][i % 5]}
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <div className="container mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-display text-orange-600 mb-4"
                >
                    🤗 Hug Day 🤗
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-700 mb-12"
                >
                    Sending you virtual hugs across the distance! 💛
                </motion.p>

                {/* Hug Counter */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto mb-12"
                >
                    <p className="text-gray-600 mb-2">Total Virtual Hugs Sent</p>
                    <motion.p
                        key={hugCount}
                        initial={{ scale: 1.5, color: '#f97316' }}
                        animate={{ scale: 1, color: '#1f2937' }}
                        className="text-7xl font-bold text-gray-800"
                    >
                        {hugCount}
                    </motion.p>
                </motion.div>

                {/* Hug Animation */}
                <div className="max-w-lg mx-auto mb-12">
                    <motion.div
                        animate={isHugging ? {
                            scale: [1, 0.8, 1.2, 1],
                            rotate: [0, -5, 5, 0],
                        } : {}}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            {/* Two figures hugging */}
                            {/* Left person */}
                            <motion.g
                                animate={isHugging ? { x: [0, 10, 0] } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <circle cx="60" cy="60" r="20" fill="#ff6b6b" />
                                <ellipse cx="60" cy="100" rx="15" ry="30" fill="#ff6b6b" />
                                <line x1="45" y1="90" x2="75" y2="100" stroke="#ff6b6b" strokeWidth="8" strokeLinecap="round" />
                                <circle cx="55" cy="55" r="3" fill="white" />
                                <circle cx="65" cy="55" r="3" fill="white" />
                                <path d="M 55 65 Q 60 68 65 65" stroke="white" strokeWidth="2" fill="none" />
                            </motion.g>

                            {/* Right person */}
                            <motion.g
                                animate={isHugging ? { x: [0, -10, 0] } : {}}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            >
                                <circle cx="140" cy="60" r="20" fill="#4ecdc4" />
                                <ellipse cx="140" cy="100" rx="15" ry="30" fill="#4ecdc4" />
                                <line x1="125" y1="100" x2="155" y2="90" stroke="#4ecdc4" strokeWidth="8" strokeLinecap="round" />
                                <circle cx="135" cy="55" r="3" fill="white" />
                                <circle cx="145" cy="55" r="3" fill="white" />
                                <path d="M 135 65 Q 140 68 145 65" stroke="white" strokeWidth="2" fill="none" />
                            </motion.g>

                            {/* Heart in the middle */}
                            <motion.g
                                animate={{
                                    scale: isHugging ? [1, 1.5, 1] : [1, 1.1, 1],
                                    opacity: isHugging ? [1, 0.5, 1] : 1,
                                }}
                                transition={{
                                    duration: isHugging ? 0.5 : 1.5,
                                    repeat: Infinity,
                                }}
                            >
                                <path
                                    d="M 100 90 C 100 80, 85 75, 85 85 C 85 95, 100 105, 100 110 C 100 105, 115 95, 115 85 C 115 75, 100 80, 100 90"
                                    fill="#ff1744"
                                />
                            </motion.g>
                        </svg>
                    </motion.div>
                </div>

                {/* Hug Button */}
                <Button
                    onClick={sendHug}
                    disabled={isHugging}
                    size="xl"
                    className="text-2xl px-12 py-6"
                >
                    {isHugging ? '🤗 Hugging...' : '🤗 Send a Virtual Hug'}
                </Button>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
                >
                    <p className="text-xl text-gray-700 leading-relaxed">
                        Even though we're apart right now, I'm sending you all my warmth
                        and love through these virtual hugs. Can't wait to give you a real
                        one soon! 🤗💕
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
