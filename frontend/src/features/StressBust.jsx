import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { stressAPI } from '../utils/api';
import { STRESS_TARGETS } from '../utils/constants';

export const StressBust = () => {
    const [selectedTarget, setSelectedTarget] = useState(STRESS_TARGETS[0]);
    const [hits, setHits] = useState(0);
    const [combo, setCombo] = useState(0);
    const [showHitEffect, setShowHitEffect] = useState(false);

    const handleHit = async () => {
        setHits(hits + 1);
        setCombo(combo + 1);
        setShowHitEffect(true);

        try {
            await stressAPI.hit(selectedTarget.id);
        } catch (error) {
            console.error(error);
        }

        setTimeout(() => setShowHitEffect(false), 200);

        // Reset combo after 2 seconds of inactivity
        setTimeout(() => setCombo(0), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="text-center">
                <p className="text-xl text-gray-700 mb-4">
                    Choose your target and let out some stress! 💥
                </p>
            </div>

            {/* Target Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STRESS_TARGETS.map(target => (
                    <Button
                        key={target.id}
                        variant={selectedTarget.id === target.id ? 'primary' : 'outline'}
                        onClick={() => setSelectedTarget(target)}
                        className="h-auto py-4"
                    >
                        <div>
                            <div className="text-3xl mb-2">
                                {target.id === 'boss' && '👔'}
                                {target.id === 'ex' && '🙄'}
                                {target.id === 'phone' && '📱'}
                                {target.id === 'monday' && '📅'}
                            </div>
                            <div className="text-sm">{target.name}</div>
                        </div>
                    </Button>
                ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6">
                <div className="bg-white rounded-lg px-6 py-3 shadow-md">
                    <p className="text-sm text-gray-600">Total Hits</p>
                    <p className="text-3xl font-bold text-red-600">{hits}</p>
                </div>
                <div className="bg-white rounded-lg px-6 py-3 shadow-md">
                    <p className="text-sm text-gray-600">Combo</p>
                    <motion.p
                        key={combo}
                        initial={{ scale: 1.5 }}
                        animate={{ scale: 1 }}
                        className="text-3xl font-bold text-orange-600"
                    >
                        {combo}x
                    </motion.p>
                </div>
            </div>

            {/* Hitting Area */}
            <div className="relative">
                <motion.div
                    onClick={handleHit}
                    whileTap={{ scale: 0.9 }}
                    className="relative w-64 h-64 mx-auto cursor-pointer"
                >
                    <AnimatePresence>
                        {showHitEffect && (
                            <>
                                <motion.div
                                    initial={{ scale: 0, opacity: 1 }}
                                    animate={{ scale: 2, opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 border-4 border-red-500 rounded-full"
                                />
                                <motion.div
                                    initial={{ y: 0, opacity: 1 }}
                                    animate={{ y: -50, opacity: 0 }}
                                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-red-600"
                                >
                                    POW!
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>

                    <motion.div
                        animate={showHitEffect ? { rotate: [0, -10, 10, -10, 0], scale: [1, 0.95, 1] } : {}}
                        className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center shadow-2xl"
                    >
                        <div className="text-8xl">
                            {selectedTarget.id === 'boss' && '👔'}
                            {selectedTarget.id === 'ex' && '🙄'}
                            {selectedTarget.id === 'phone' && '📱'}
                            {selectedTarget.id === 'monday' && '📅'}
                        </div>
                    </motion.div>
                </motion.div>

                <p className="text-center mt-4 text-gray-600">
                    Click to hit! Release your stress! 💥
                </p>
            </div>

            {combo >= 5 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-orange-100 rounded-xl p-4 text-center"
                >
                    <p className="text-lg font-bold text-orange-600">
                        🔥 {combo}x COMBO! You're on fire! 🔥
                    </p>
                </motion.div>
            )}
        </div>
    );
};
