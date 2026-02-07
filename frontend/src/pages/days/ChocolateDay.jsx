import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { choicesAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import { CHOCOLATES } from '../../utils/constants';

export const ChocolateDay = () => {
    const [selectedChocolate, setSelectedChocolate] = useState(null);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Load previous choice
        choicesAPI.get('chocolate')
            .then(res => {
                if (res.data) {
                    setSelectedChocolate(res.data.choice);
                    setSaved(true);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const handleSelect = async (chocolateId) => {
        setSelectedChocolate(chocolateId);

        try {
            await choicesAPI.save({ day: 'chocolate', choice: chocolateId });
            setSaved(true);
            toast.success('Your choice has been saved! I\'ll get it for you! 🍫');
        } catch (error) {
            console.error(error);
            toast.error('Failed to save choice');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-12 px-4">
            <div className="container mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-display text-amber-700 mb-4"
                >
                    🍫 Chocolate Day 🍫
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-700 mb-12"
                >
                    Choose your favorite chocolate and I'll buy it for you! 💝
                </motion.p>

                {/* Chocolate Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
                    {CHOCOLATES.map((chocolate, index) => (
                        <motion.div
                            key={chocolate.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Card
                                hover={true}
                                onClick={() => !saved && handleSelect(chocolate.id)}
                                className={`
                  relative cursor-pointer transition-all duration-300
                  ${selectedChocolate === chocolate.id ? 'ring-4 ring-amber-500 bg-amber-50' : ''}
                  ${saved ? 'cursor-not-allowed' : ''}
                `}
                            >
                                {selectedChocolate === chocolate.id && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-4 -right-4 bg-green-500 rounded-full p-2 shadow-lg"
                                    >
                                        <Check size={24} className="text-white" />
                                    </motion.div>
                                )}

                                <div className="aspect-square bg-gradient-to-br from-amber-200 to-orange-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="text-8xl"
                                    >
                                        {chocolate.id === 'kitkat' && '🍫'}
                                        {chocolate.id === 'silk' && '🍫'}
                                        {chocolate.id === 'cake' && '🍰'}
                                    </motion.div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                    {chocolate.name}
                                </h3>

                                {selectedChocolate === chocolate.id && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-green-600 font-semibold"
                                    >
                                        ✓ Selected
                                    </motion.p>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Message after selection */}
                {saved && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-6xl mb-4"
                        >
                            🎁
                        </motion.div>

                        <h2 className="text-3xl font-display text-amber-700 mb-4">
                            Perfect Choice!
                        </h2>

                        <p className="text-lg text-gray-700">
                            I'll get you the {CHOCOLATES.find(c => c.id === selectedChocolate)?.name}!
                            <br />
                            Because you deserve all the sweetness in the world! 💖
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
