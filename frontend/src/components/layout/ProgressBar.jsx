import React from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../../hooks/useProgress';
import { VALENTINE_WEEK } from '../../utils/constants';

export const ProgressBar = () => {
    const { progress, timeRemaining } = useProgress();

    return (
        <div className="bg-white shadow-md py-4 px-6 sticky top-0 z-30">
            <div className="container mx-auto">
                {/* Progress bar */}
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-valentine-400 to-valentine-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Day markers */}
                    {VALENTINE_WEEK.DAYS.map((day, index) => (
                        <div
                            key={index}
                            className="absolute top-0 h-full w-0.5 bg-white"
                            style={{ left: `${(index / 7) * 100}%` }}
                        />
                    ))}
                </div>

                {/* Day labels */}
                <div className="flex justify-between text-xs text-gray-600">
                    {VALENTINE_WEEK.DAYS.map((day, index) => (
                        <div key={index} className="text-center" style={{ width: '14.28%' }}>
                            <span className="block">{day.emoji}</span>
                            <span className="block text-[10px]">{day.name.split(' ')[0]}</span>
                        </div>
                    ))}
                </div>

                {/* Countdown */}
                {progress < 100 && (
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">Time until Valentine's Day</p>
                        <div className="flex justify-center gap-4 mt-2">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-valentine-600">{timeRemaining.days}</p>
                                <p className="text-xs text-gray-500">Days</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-valentine-600">{timeRemaining.hours}</p>
                                <p className="text-xs text-gray-500">Hours</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-valentine-600">{timeRemaining.minutes}</p>
                                <p className="text-xs text-gray-500">Minutes</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-valentine-600">{timeRemaining.seconds}</p>
                                <p className="text-xs text-gray-500">Seconds</p>
                            </div>
                        </div>
                    </div>
                )}

                {progress >= 100 && (
                    <div className="mt-4 text-center">
                        <motion.p
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-2xl font-bold text-valentine-600"
                        >
                            🎉 Happy Valentine's Day! 🎉
                        </motion.p>
                    </div>
                )}
            </div>
        </div>
    );
};
