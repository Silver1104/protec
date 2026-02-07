import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Check } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Hearts } from '../../components/animations/Hearts';
import { promisesAPI } from '../../utils/api';
import { PROMISES } from '../../utils/constants';

export const PromiseDay = () => {
    const [readPromises, setReadPromises] = useState([]);

    useEffect(() => {
        markAsRead();
    }, []);

    const markAsRead = async () => {
        try {
            await promisesAPI.markRead();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePromiseRead = (index) => {
        if (!readPromises.includes(index)) {
            setReadPromises([...readPromises, index]);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4 relative overflow-hidden">
            <Hearts count={12} />

            <div className="container mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-display text-indigo-600 text-center mb-4"
                >
                    🤝 Promise Day 🤝
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto"
                >
                    Here are my promises to you, sealed with love and commitment.
                    Click each promise to mark it as read. 💙
                </motion.p>

                {/* Promises List */}
                <div className="max-w-4xl mx-auto space-y-4 mb-12">
                    {PROMISES.map((promise, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card
                                hover={true}
                                onClick={() => handlePromiseRead(index)}
                                className={`
                  cursor-pointer transition-all duration-300
                  ${readPromises.includes(index) ? 'bg-indigo-50 border-2 border-indigo-300' : ''}
                `}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`
                    flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                    ${readPromises.includes(index) ? 'bg-indigo-500' : 'bg-gray-200'}
                    transition-colors duration-300
                  `}>
                                        {readPromises.includes(index) ? (
                                            <Check size={20} className="text-white" />
                                        ) : (
                                            <Heart size={20} className="text-gray-400" />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <p className="text-lg text-gray-800 leading-relaxed">
                                            {promise}
                                        </p>
                                    </div>

                                    <div className="flex-shrink-0 text-3xl">
                                        💙
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Completion Message */}
                {readPromises.length === PROMISES.length && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto text-center"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-8xl mb-6"
                        >
                            💝
                        </motion.div>

                        <h2 className="text-3xl font-display text-indigo-600 mb-4">
                            Thank You for Reading!
                        </h2>

                        <p className="text-xl text-gray-700">
                            These promises are not just words—they are my commitment to you.
                            <br />
                            I will keep them all, today and every day. 💙
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
