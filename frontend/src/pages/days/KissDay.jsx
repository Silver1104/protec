import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { choicesAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import { Sparkles } from '../../components/animations/Sparkles';

export const KissDay = () => {
    const [choice, setChoice] = useState(null);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        // Load previous choice
        choicesAPI.get('kiss')
            .then(res => {
                if (res.data) {
                    setChoice(res.data.choice);
                    setShowMessage(true);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const handleChoice = async (selectedChoice) => {
        setChoice(selectedChoice);

        try {
            await choicesAPI.save({ day: 'kiss', choice: selectedChoice });

            setTimeout(() => {
                setShowMessage(true);

                if (selectedChoice === 'hersheys') {
                    toast.success("I'll get you Hershey's Kisses! But remember... 😏");
                } else {
                    toast.success("Best choice ever! 💋", { icon: '😘' });
                }
            }, 500);
        } catch (error) {
            console.error(error);
            toast.error('Failed to save choice');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-pink-100 py-12 px-4">
            <div className="container mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-display text-red-600 mb-4"
                >
                    💋 Kiss Day 💋
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-700 mb-12"
                >
                    Choose your kisses wisely... 😘
                </motion.p>

                {!showMessage ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Hershey's Kisses Option */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card
                                hover={true}
                                onClick={() => handleChoice('hersheys')}
                                className="cursor-pointer h-full"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="text-9xl mb-6"
                                >
                                    🍫
                                </motion.div>

                                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                                    Hershey's Kisses
                                </h2>

                                <p className="text-lg text-gray-600">
                                    Classic chocolate kisses
                                </p>
                            </Card>
                        </motion.div>

                        {/* Your Kisses Option */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Card
                                hover={true}
                                onClick={() => handleChoice('yours')}
                                className="cursor-pointer h-full border-4 border-red-300"
                            >
                                <Sparkles>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="text-9xl mb-6"
                                    >
                                        💋
                                    </motion.div>
                                </Sparkles>

                                <h2 className="text-3xl font-bold text-red-600 mb-4">
                                    Your Kisses
                                </h2>

                                <p className="text-lg text-gray-600">
                                    The best choice! 😘
                                </p>
                            </Card>
                        </motion.div>
                    </div>
                ) : (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="max-w-2xl mx-auto"
                        >
                            {choice === 'hersheys' ? (
                                <Card className="bg-gradient-to-br from-amber-50 to-orange-50">
                                    <motion.div
                                        animate={{ rotate: [0, -10, 10, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="text-8xl mb-6"
                                    >
                                        🍫
                                    </motion.div>

                                    <h2 className="text-3xl font-display text-amber-700 mb-4">
                                        Hershey's Kisses it is!
                                    </h2>

                                    <p className="text-xl text-gray-700 mb-6">
                                        I'll get you Hershey's Kisses...
                                    </p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-red-50 rounded-2xl p-6 border-2 border-red-300"
                                    >
                                        <p className="text-2xl font-bold text-red-600 mb-2">
                                            But wait... 😏
                                        </p>
                                        <p className="text-xl text-gray-700">
                                            I taste better than Hershey's! 💋
                                            <br />
                                            You're getting MY kisses too! 😘
                                        </p>
                                    </motion.div>
                                </Card>
                            ) : (
                                <Card className="bg-gradient-to-br from-red-50 to-pink-50">
                                    <Sparkles>
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 5, -5, 0],
                                            }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="text-9xl mb-6"
                                        >
                                            💋
                                        </motion.div>
                                    </Sparkles>

                                    <h2 className="text-4xl font-display text-red-600 mb-4">
                                        Perfect Choice!
                                    </h2>

                                    <p className="text-2xl text-gray-700 mb-4">
                                        You chose MY kisses! 😘
                                    </p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-white rounded-2xl p-6"
                                    >
                                        <p className="text-xl text-gray-700">
                                            That's the best decision you could have made!
                                            <br />
                                            My kisses are all yours, today and always! 💕💋
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="mt-6 text-6xl"
                                    >
                                        😘💕💋
                                    </motion.div>
                                </Card>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
};
