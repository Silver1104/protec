import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Play, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { aimScoreAPI } from '../utils/api';
import toast from 'react-hot-toast';

export const AimTrainer = () => {
    const [gameState, setGameState] = useState('idle'); // idle, playing, finished
    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
    const [highScore, setHighScore] = useState(0);
    const [targetSize, setTargetSize] = useState(60);
    const gameAreaRef = useRef(null);

    useEffect(() => {
        loadHighScore();
    }, []);

    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && gameState === 'playing') {
            endGame();
        }
    }, [gameState, timeLeft]);

    const loadHighScore = async () => {
        try {
            const res = await aimScoreAPI.getHighScore();
            setHighScore(res.data.score || 0);
        } catch (error) {
            console.error(error);
        }
    };

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setMisses(0);
        setTimeLeft(30);
        setTargetSize(60);
        spawnTarget();
    };

    const spawnTarget = () => {
        if (gameAreaRef.current) {
            const area = gameAreaRef.current.getBoundingClientRect();
            const maxX = area.width - targetSize;
            const maxY = area.height - targetSize;

            setTargetPosition({
                x: Math.random() * maxX,
                y: Math.random() * maxY,
            });
        }
    };

    const handleTargetHit = () => {
        setScore(score + 1);

        // Make target smaller as score increases (difficulty increase)
        if (score > 0 && score % 5 === 0) {
            setTargetSize(Math.max(30, targetSize - 5));
        }

        spawnTarget();
    };

    const handleMiss = () => {
        setMisses(misses + 1);
    };

    const endGame = async () => {
        setGameState('finished');

        const accuracy = score + misses > 0 ? ((score / (score + misses)) * 100).toFixed(1) : 0;

        try {
            await aimScoreAPI.save({
                score,
                accuracy: parseFloat(accuracy),
                duration: 30,
            });

            if (score > highScore) {
                setHighScore(score);
                toast.success('New high score! 🎯');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const accuracy = score + misses > 0 ? ((score / (score + misses)) * 100).toFixed(1) : 0;

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Aim Trainer for Valorant
                </h2>
                <p className="text-gray-600">
                    Improve your aim! Click the targets as fast as you can! 🎯
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="text-center">
                    <p className="text-sm text-gray-600">Score</p>
                    <p className="text-3xl font-bold text-green-600">{score}</p>
                </Card>

                <Card className="text-center">
                    <p className="text-sm text-gray-600">Accuracy</p>
                    <p className="text-3xl font-bold text-blue-600">{accuracy}%</p>
                </Card>

                <Card className="text-center">
                    <p className="text-sm text-gray-600">Time Left</p>
                    <p className="text-3xl font-bold text-orange-600">{timeLeft}s</p>
                </Card>

                <Card className="text-center">
                    <p className="text-sm text-gray-600">High Score</p>
                    <p className="text-3xl font-bold text-purple-600">{highScore}</p>
                </Card>
            </div>

            {/* Game Area */}
            {gameState === 'idle' && (
                <Card className="text-center py-12">
                    <Target size={64} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Ready to Train?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        You have 30 seconds to hit as many targets as possible!
                    </p>
                    <Button onClick={startGame} size="lg">
                        <Play size={20} className="mr-2" />
                        Start Training
                    </Button>
                </Card>
            )}

            {gameState === 'playing' && (
                <div
                    ref={gameAreaRef}
                    onClick={handleMiss}
                    className="relative w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden cursor-crosshair"
                >
                    {/* Crosshair */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-green-500 opacity-30" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-500 opacity-30" />
                    </div>

                    {/* Target */}
                    <AnimatePresence>
                        <motion.div
                            key={`${targetPosition.x}-${targetPosition.y}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleTargetHit();
                            }}
                            className="absolute cursor-pointer"
                            style={{
                                left: targetPosition.x,
                                top: targetPosition.y,
                                width: targetSize,
                                height: targetSize,
                            }}
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <circle cx="50" cy="50" r="48" fill="#ef4444" opacity="0.8" />
                                <circle cx="50" cy="50" r="35" fill="#dc2626" opacity="0.8" />
                                <circle cx="50" cy="50" r="20" fill="#991b1b" opacity="0.8" />
                                <circle cx="50" cy="50" r="8" fill="#7f1d1d" />
                            </svg>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            {gameState === 'finished' && (
                <Card className="text-center py-12">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-6xl mb-4"
                    >
                        🎯
                    </motion.div>

                    <h3 className="text-3xl font-bold text-gray-800 mb-4">
                        Training Complete!
                    </h3>

                    <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-6">
                        <div className="bg-green-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600">Hits</p>
                            <p className="text-3xl font-bold text-green-600">{score}</p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600">Misses</p>
                            <p className="text-3xl font-bold text-red-600">{misses}</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600">Accuracy</p>
                            <p className="text-3xl font-bold text-blue-600">{accuracy}%</p>
                        </div>
                    </div>

                    {score > highScore && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xl font-bold text-purple-600 mb-4"
                        >
                            🎉 New High Score! 🎉
                        </motion.p>
                    )}

                    <Button onClick={startGame} size="lg">
                        <RotateCcw size={20} className="mr-2" />
                        Train Again
                    </Button>
                </Card>
            )}
        </div>
    );
};
