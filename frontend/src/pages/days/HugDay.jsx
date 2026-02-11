import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { hugsAPI } from '../../utils/api';
import toast from 'react-hot-toast';

export const HugDay = () => {
    const [hugCount, setHugCount] = useState(0);
    const [isHugging, setIsHugging] = useState(false);
    const [showHearts, setShowHearts] = useState(false);
    const [showDisclaimer, setShowDisclaimer] = useState(true);

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
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-100 py-6 sm:py-12 px-4 relative overflow-hidden">
            {/* Floating Hearts Animation */}
            <AnimatePresence>
                {showHearts && (
                    <div className="fixed inset-0 pointer-events-none z-10">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute text-3xl sm:text-4xl"
                                initial={{
                                    x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 400,
                                    y: typeof window !== 'undefined' ? window.innerHeight : 800,
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

            {/* Disclaimer Banner */}
            <AnimatePresence>
                {showDisclaimer && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-4 left-4 right-4 z-20 mx-auto max-w-2xl"
                    >
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl shadow-2xl p-4 sm:p-6 relative">
                            <button
                                onClick={() => setShowDisclaimer(false)}
                                className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                            >
                                ✕
                            </button>
                            <div className="flex items-start gap-3 pr-8">
                                <span className="text-2xl sm:text-3xl flex-shrink-0">🤷</span>
                                <div className="space-y-1">
                                    <p className="font-semibold text-sm sm:text-base">Honest Confession Time:</p>
                                    <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                                        I genuinely had no idea what to do for Hug Day. Like... what do you even do? Send virtual hugs?
                                        So yeah, that's exactly what I did. 😅
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto max-w-5xl pt-20 sm:pt-24">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                        className="inline-block mb-4"
                    >
                        <div className="text-6xl sm:text-8xl md:text-9xl filter drop-shadow-lg">
                            🤗
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4"
                    >
                        Hug Day
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-base sm:text-xl text-gray-700 px-4"
                    >
                        Sending you virtual hugs across the distance! 💛
                    </motion.p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
                    {/* Hug Counter Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-orange-200"
                    >
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 font-medium">
                                Total Virtual Hugs Sent
                            </p>
                            <motion.div
                                key={hugCount}
                                initial={{ scale: 1.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative"
                            >
                                <motion.p
                                    className="text-7xl sm:text-8xl md:text-9xl font-bold bg-gradient-to-br from-orange-500 to-pink-500 bg-clip-text text-transparent"
                                >
                                    {hugCount}
                                </motion.p>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [0, 1.2, 1] }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute -top-2 -right-2 text-2xl sm:text-3xl"
                                >
                                    💕
                                </motion.div>
                            </motion.div>
                            {hugCount > 0 && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-xs sm:text-sm text-gray-500 mt-3 text-center"
                                >
                                    {hugCount === 1 && "First hug is always special! 🥰"}
                                    {hugCount >= 2 && hugCount < 5 && "Keep them coming! 💗"}
                                    {hugCount >= 5 && hugCount < 10 && "You're on a roll! 🤗"}
                                    {hugCount >= 10 && hugCount < 20 && "Hug master status! 💖"}
                                    {hugCount >= 20 && "Legendary hugger! 🏆"}
                                </motion.p>
                            )}
                        </div>
                    </motion.div>

                    {/* Hug Animation Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-pink-200"
                    >
                        <motion.div
                            animate={isHugging ? {
                                scale: [1, 0.85, 1.15, 1],
                                rotate: [0, -3, 3, 0],
                            } : {}}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <svg viewBox="0 0 200 200" className="w-full h-full max-w-xs sm:max-w-sm mx-auto">
                                {/* Left person */}
                                <motion.g
                                    animate={isHugging ? {
                                        x: [0, 8, 0],
                                        scale: [1, 1.05, 1]
                                    } : {}}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <circle cx="60" cy="60" r="20" fill="#ff6b6b" />
                                    <ellipse cx="60" cy="100" rx="15" ry="30" fill="#ff6b6b" />
                                    <line x1="45" y1="90" x2="75" y2="100" stroke="#ff6b6b" strokeWidth="8" strokeLinecap="round" />
                                    <circle cx="55" cy="55" r="3" fill="white" />
                                    <circle cx="65" cy="55" r="3" fill="white" />
                                    <motion.path
                                        d="M 55 65 Q 60 68 65 65"
                                        stroke="white"
                                        strokeWidth="2"
                                        fill="none"
                                        animate={isHugging ? { d: "M 55 65 Q 60 70 65 65" } : {}}
                                    />
                                </motion.g>

                                {/* Right person */}
                                <motion.g
                                    animate={isHugging ? {
                                        x: [0, -8, 0],
                                        scale: [1, 1.05, 1]
                                    } : {}}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                >
                                    <circle cx="140" cy="60" r="20" fill="#4ecdc4" />
                                    <ellipse cx="140" cy="100" rx="15" ry="30" fill="#4ecdc4" />
                                    <line x1="125" y1="100" x2="155" y2="90" stroke="#4ecdc4" strokeWidth="8" strokeLinecap="round" />
                                    <circle cx="135" cy="55" r="3" fill="white" />
                                    <circle cx="145" cy="55" r="3" fill="white" />
                                    <motion.path
                                        d="M 135 65 Q 140 68 145 65"
                                        stroke="white"
                                        strokeWidth="2"
                                        fill="none"
                                        animate={isHugging ? { d: "M 135 65 Q 140 70 145 65" } : {}}
                                    />
                                </motion.g>

                                {/* Heart in the middle */}
                                <motion.g
                                    animate={{
                                        scale: isHugging ? [1, 1.6, 1] : [1, 1.15, 1],
                                        opacity: isHugging ? [1, 0.7, 1] : 1,
                                    }}
                                    transition={{
                                        duration: isHugging ? 0.6 : 1.5,
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

                        {/* Hug Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="mt-6"
                        >
                            <Button
                                onClick={sendHug}
                                disabled={isHugging}
                                size="xl"
                                className="w-full text-lg sm:text-2xl py-4 sm:py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                            >
                                {isHugging ? (
                                    <motion.span
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ repeat: 3, duration: 0.5 }}
                                    >
                                        🤗 Hugging...
                                    </motion.span>
                                ) : (
                                    '🤗 Send a Virtual Hug'
                                )}
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Message Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-10 border-2 border-purple-200 mb-8"
                >
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <span className="text-3xl sm:text-4xl flex-shrink-0">💝</span>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                                A Virtual Hug, Just For You
                            </h2>
                        </div>

                        <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                            <p>
                                Imma cuddly wuddly my baby gurlyyyy
                            </p>
                            <p>
                                If I could give you a real hug right now, I would. The kind that lasts
                                just a little too long, where neither of us wants to let go first.
                            </p>
                            <p className="text-base sm:text-lg md:text-xl font-semibold text-orange-600 text-center pt-2 sm:pt-4">
                                Can't wait to give you a real one soon! 🤗💕
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Fun Stats */}
                {hugCount > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
                    >
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-orange-200">
                            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🎯</div>
                            <div className="text-xl sm:text-2xl font-bold text-gray-800">{hugCount}</div>
                            <div className="text-xs sm:text-sm text-gray-600">Hugs Sent</div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-pink-200">
                            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">💖</div>
                            <div className="text-xl sm:text-2xl font-bold text-gray-800">{Math.floor(hugCount * 1.5)}</div>
                            <div className="text-xs sm:text-sm text-gray-600">Love Points</div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-purple-200 col-span-2 sm:col-span-1">
                            <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🏆</div>
                            <div className="text-xl sm:text-2xl font-bold text-gray-800">
                                {hugCount < 5 ? "Newbie" : hugCount < 10 ? "Regular" : hugCount < 20 ? "Pro" : "Legend"}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">Hugger Rank</div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
