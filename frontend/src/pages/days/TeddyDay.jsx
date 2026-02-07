import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { bearAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import { BEAR_OPTIONS } from '../../utils/constants';

export const TeddyDay = () => {
    const [bear, setBear] = useState({
        bodyColor: 'brown',
        shirtColor: 'red',
        pantsColor: 'blue',
        shoesColor: 'black',
        accessory: 'none',
        name: '',
    });
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Load saved bear
        bearAPI.get()
            .then(res => {
                if (res.data) {
                    setBear(res.data);
                    setSaved(true);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const handleSave = async () => {
        try {
            await bearAPI.save(bear);
            setSaved(true);
            toast.success('Your teddy bear has been saved! 🧸');
        } catch (error) {
            console.error(error);
            toast.error('Failed to save bear');
        }
    };

    const ColorButton = ({ color, selected, onClick }) => (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            className={`
        w-12 h-12 rounded-full border-4 transition-all
        ${selected ? 'border-pink-500 scale-110' : 'border-gray-300'}
      `}
            style={{ backgroundColor: color }}
        />
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 py-12 px-4">
            <div className="container mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-display text-pink-600 text-center mb-4"
                >
                    🧸 Teddy Day 🧸
                </motion.h1>

                <p className="text-xl text-gray-700 text-center mb-12">
                    Build your perfect teddy bear!
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* Bear Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl shadow-xl p-8"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            Your Teddy Bear
                        </h2>

                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            <svg viewBox="0 0 200 240" className="w-full h-full">
                                {/* Bear Body */}
                                <ellipse cx="100" cy="140" rx="50" ry="60" fill={bear.bodyColor} />

                                {/* Bear Head */}
                                <circle cx="100" cy="70" r="40" fill={bear.bodyColor} />

                                {/* Ears */}
                                <circle cx="70" cy="45" r="18" fill={bear.bodyColor} />
                                <circle cx="130" cy="45" r="18" fill={bear.bodyColor} />
                                <circle cx="70" cy="45" r="12" fill="#ffb3ba" />
                                <circle cx="130" cy="45" r="12" fill="#ffb3ba" />

                                {/* Face */}
                                <circle cx="85" cy="65" r="5" fill="black" />
                                <circle cx="115" cy="65" r="5" fill="black" />
                                <ellipse cx="100" cy="80" rx="8" ry="6" fill="black" />
                                <path d="M 100 80 Q 95 85 90 82" stroke="black" strokeWidth="2" fill="none" />
                                <path d="M 100 80 Q 105 85 110 82" stroke="black" strokeWidth="2" fill="none" />

                                {/* Shirt */}
                                <ellipse cx="100" cy="130" rx="45" ry="35" fill={bear.shirtColor} />

                                {/* Pants */}
                                <rect x="60" y="155" width="35" height="40" rx="5" fill={bear.pantsColor} />
                                <rect x="105" y="155" width="35" height="40" rx="5" fill={bear.pantsColor} />

                                {/* Arms */}
                                <ellipse cx="60" cy="125" rx="15" ry="35" fill={bear.bodyColor} transform="rotate(-20 60 125)" />
                                <ellipse cx="140" cy="125" rx="15" ry="35" fill={bear.bodyColor} transform="rotate(20 140 125)" />

                                {/* Shoes */}
                                <ellipse cx="77" cy="200" rx="18" ry="12" fill={bear.shoesColor} />
                                <ellipse cx="123" cy="200" rx="18" ry="12" fill={bear.shoesColor} />

                                {/* Accessory */}
                                {bear.accessory === 'hat' && (
                                    <>
                                        <rect x="70" y="25" width="60" height="8" rx="4" fill="#333" />
                                        <rect x="80" y="15" width="40" height="15" rx="3" fill="#333" />
                                    </>
                                )}
                                {bear.accessory === 'glasses' && (
                                    <>
                                        <circle cx="85" cy="65" r="8" fill="none" stroke="black" strokeWidth="2" />
                                        <circle cx="115" cy="65" r="8" fill="none" stroke="black" strokeWidth="2" />
                                        <line x1="93" y1="65" x2="107" y2="65" stroke="black" strokeWidth="2" />
                                    </>
                                )}
                                {bear.accessory === 'bowtie' && (
                                    <path d="M 90 110 L 100 105 L 110 110 L 100 115 Z M 80 107.5 L 90 110 L 90 115 L 80 112.5 Z M 110 110 L 120 107.5 L 120 112.5 L 110 115 Z" fill="#ff1744" />
                                )}
                                {bear.accessory === 'scarf' && (
                                    <>
                                        <rect x="85" y="95" width="30" height="10" rx="2" fill="#ff6b6b" />
                                        <rect x="95" y="105" width="10" height="25" rx="2" fill="#ff6b6b" />
                                    </>
                                )}
                            </svg>
                        </div>

                        {bear.name && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mt-4"
                            >
                                <p className="text-2xl font-display text-pink-600">
                                    {bear.name} 💕
                                </p>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Customization Options */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {/* Body Color */}
                        <Card>
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Body Color</h3>
                            <div className="flex gap-3 flex-wrap">
                                {BEAR_OPTIONS.bodyColor.map(color => (
                                    <ColorButton
                                        key={color}
                                        color={color}
                                        selected={bear.bodyColor === color}
                                        onClick={() => setBear({ ...bear, bodyColor: color })}
                                    />
                                ))}
                            </div>
                        </Card>

                        {/* Shirt Color */}
                        <Card>
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Shirt Color</h3>
                            <div className="flex gap-3 flex-wrap">
                                {BEAR_OPTIONS.shirtColor.map(color => (
                                    <ColorButton
                                        key={color}
                                        color={color}
                                        selected={bear.shirtColor === color}
                                        onClick={() => setBear({ ...bear, shirtColor: color })}
                                    />
                                ))}
                            </div>
                        </Card>

                        {/* Pants Color */}
                        <Card>
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Pants Color</h3>
                            <div className="flex gap-3 flex-wrap">
                                {BEAR_OPTIONS.pantsColor.map(color => (
                                    <ColorButton
                                        key={color}
                                        color={color}
                                        selected={bear.pantsColor === color}
                                        onClick={() => setBear({ ...bear, pantsColor: color })}
                                    />
                                ))}
                            </div>
                        </Card>

                        {/* Shoes Color */}
                        <Card>
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Shoes Color</h3>
                            <div className="flex gap-3 flex-wrap">
                                {BEAR_OPTIONS.shoesColor.map(color => (
                                    <ColorButton
                                        key={color}
                                        color={color}
                                        selected={bear.shoesColor === color}
                                        onClick={() => setBear({ ...bear, shoesColor: color })}
                                    />
                                ))}
                            </div>
                        </Card>

                        {/* Accessory */}
                        <Card>
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Accessory</h3>
                            <div className="flex gap-3 flex-wrap">
                                {BEAR_OPTIONS.accessory.map(acc => (
                                    <Button
                                        key={acc}
                                        variant={bear.accessory === acc ? 'primary' : 'outline'}
                                        size="sm"
                                        onClick={() => setBear({ ...bear, accessory: acc })}
                                    >
                                        {acc === 'none' ? 'None' : acc.charAt(0).toUpperCase() + acc.slice(1)}
                                    </Button>
                                ))}
                            </div>
                        </Card>

                        {/* Name */}
                        <Card>
                            <h3 className="text-lg font-bold text-gray-800 mb-3">Name Your Bear</h3>
                            <input
                                type="text"
                                value={bear.name}
                                onChange={(e) => setBear({ ...bear, name: e.target.value })}
                                placeholder="Enter bear's name..."
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                                maxLength={20}
                            />
                        </Card>

                        {/* Save Button */}
                        <Button onClick={handleSave} className="w-full" size="lg">
                            {saved ? '✓ Saved' : 'Save My Bear'}
                        </Button>

                        {saved && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-green-600 font-semibold"
                            >
                                Your teddy bear has been saved! I can see your creation! 🧸💕
                            </motion.p>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
