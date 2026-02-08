import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Heart } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Confetti } from '../../components/animations/Confetti';
import { choicesAPI } from '../../utils/api';
import toast from 'react-hot-toast';

const DIFFICULTIES = {
    easy: { speed: 0.4, spawnRate: 2500, label: 'Easy', emoji: '😊' },
    medium: { speed: 0.7, spawnRate: 2000, label: 'Medium', emoji: '😎' },
    hard: { speed: 1.0, spawnRate: 1600, label: 'Hard', emoji: '🔥' },
};


const CHOCOLATES = [
    { id: 'kitkat', emoji: '🍫', name: 'KitKat', points: 10, weight: 5 },
    { id: 'silk', emoji: '🍬', name: 'Silk', points: 5, weight: 2 },
    { id: 'cake', emoji: '🍰', name: 'Cake', points: 5, weight: 2 },
];

const WIN_SCORE = 100;

export const ChocolateDay = () => {
    const [gameState, setGameState] = useState('menu'); // menu, playing, won
    const [difficulty, setDifficulty] = useState(null);
    const [score, setScore] = useState(0);
    const [playerX, setPlayerX] = useState(50); // percentage from left
    const [fallingChocolates, setFallingChocolates] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);

    const gameAreaRef = useRef(null);
    const animationFrameRef = useRef(null);
    const chocolateIdCounter = useRef(0);
    const spawnIntervalRef = useRef(null);

    const PLAYER_WIDTH = 15; // percentage of game width
    const CHOCOLATE_SIZE = 8; // percentage of game width

    // Spawn chocolates
    useEffect(() => {
        if (gameState !== 'playing') return;

        const spawnChocolate = () => {
            const weights = CHOCOLATES.map(c => c.weight);
            const totalWeight = weights.reduce((sum, w) => sum + w, 0);
            const random = Math.random() * totalWeight;

            let cumulative = 0;
            let selectedChocolate = CHOCOLATES[0];

            for (let i = 0; i < CHOCOLATES.length; i++) {
                cumulative += CHOCOLATES[i].weight;
                if (random < cumulative) {
                    selectedChocolate = CHOCOLATES[i];
                    break;
                }
            }

            const newChocolate = {
                id: chocolateIdCounter.current++,
                type: selectedChocolate.id,
                emoji: selectedChocolate.emoji,
                points: selectedChocolate.points,
                x: Math.random() * 80 + 10, // 10-90% from left (safer spawn area)
                y: 0, // start at top
            };

            setFallingChocolates(prev => [...prev, newChocolate]);
        };

        spawnChocolate(); // Spawn first one immediately
        spawnIntervalRef.current = setInterval(
            spawnChocolate,
            DIFFICULTIES[difficulty].spawnRate
        );

        return () => clearInterval(spawnIntervalRef.current);
    }, [gameState, difficulty]);

    // Game loop - move chocolates and check collisions
    useEffect(() => {
        if (gameState !== 'playing') return;

        const gameLoop = () => {
            setFallingChocolates(prev => {
                const updated = prev.map(chocolate => ({
                    ...chocolate,
                    y: chocolate.y + DIFFICULTIES[difficulty].speed,
                }));

                // Check collisions and floor hits
                const remaining = [];
                updated.forEach(chocolate => {

                    // Hit floor (bottom 85% of screen)
                    if (chocolate.y >= 85) {
                        setScore(s => Math.max(0, s - 5)); // -5 points, min 0
                        toast.error('-5 points! 😢', { duration: 800, position: 'top-center' });
                        return; // Remove chocolate
                    }

                    // Check collision with player (player is at 75% from top)
                    const playerLeft = playerX - (PLAYER_WIDTH / 2);
                    const playerRight = playerX + (PLAYER_WIDTH / 2);
                    const playerTop = 70; // collision starts earlier
                    const playerBottom = 85;

                    const chocolateLeft = chocolate.x - (CHOCOLATE_SIZE / 2);
                    const chocolateRight = chocolate.x + (CHOCOLATE_SIZE / 2);
                    const chocolateY = chocolate.y;

                    const isColliding =
                        chocolateY >= playerTop &&
                        chocolateY <= playerBottom &&
                        chocolateRight >= playerLeft &&
                        chocolateLeft <= playerRight;

                    if (isColliding) {
                        setScore(s => s + chocolate.points);
                        toast.success(`+${chocolate.points} points! ${chocolate.emoji}`, {
                            duration: 800,
                            position: 'top-center',
                        });
                        return; // Remove chocolate
                    }

                    remaining.push(chocolate);
                });

                return remaining;
            });

            animationFrameRef.current = requestAnimationFrame(gameLoop);
        };

        animationFrameRef.current = requestAnimationFrame(gameLoop);

        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [gameState, difficulty, playerX]);

    // Check win condition
    useEffect(() => {
        if (score >= WIN_SCORE && gameState === 'playing') {
            setGameState('won');
            setShowConfetti(true);

            // Save to backend
            choicesAPI.save({ day: 'chocolate', choice: 'completed', score })
                .catch(err => console.error(err));
        }
    }, [score, gameState]);

    // Mouse/Touch controls
    const handleMove = (clientX) => {
        if (!gameAreaRef.current) return;

        const rect = gameAreaRef.current.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        setPlayerX(Math.max(10, Math.min(90, x))); // Keep within bounds
    };

    const handleMouseMove = (e) => {
        handleMove(e.clientX);
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        if (e.touches.length > 0) {
            handleMove(e.touches[0].clientX);
        }
    };

    const startGame = (selectedDifficulty) => {
        setDifficulty(selectedDifficulty);
        setGameState('playing');
        setScore(0);
        setPlayerX(50);
        setFallingChocolates([]);
        chocolateIdCounter.current = 0;
    };

    const resetGame = () => {
        setGameState('menu');
        setDifficulty(null);
        setScore(0);
        setPlayerX(50);
        setFallingChocolates([]);
        setShowConfetti(false);
    };

    // Menu Screen
    if (gameState === 'menu') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 flex items-center justify-center px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl w-full"
                >
                    <div className="text-center mb-6">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-6xl md:text-8xl mb-4"
                        >
                            🍫
                        </motion.div>
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">
                            Chocolate Catch Game
                        </h1>
                        <p className="text-base md:text-lg text-gray-600 mb-2">
                            Catch falling chocolates to reach {WIN_SCORE} points!
                        </p>
                        <p className="text-xs md:text-sm text-gray-500">
                            🍫 KitKat = +10 points • 🍬 Silk = +5 • 🍰 Cake = +5 • Miss = -5
                        </p>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-xl md:text-2xl font-bold text-center text-gray-700 mb-3">
                            Choose Difficulty
                        </h2>

                        {Object.entries(DIFFICULTIES).map(([key, diff]) => (
                            <motion.div key={key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Card
                                    hover
                                    onClick={() => startGame(key)}
                                    className="cursor-pointer text-center p-4 md:p-6 bg-white"
                                >
                                    <div className="flex items-center justify-center gap-3 md:gap-4">
                                        <span className="text-3xl md:text-4xl">{diff.emoji}</span>
                                        <div className="text-left">
                                            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                                                {diff.label}
                                            </h3>
                                            <p className="text-xs md:text-sm text-gray-600">
                                                Speed: {diff.speed.toFixed(1)}x • Spawn: {(diff.spawnRate / 1000).toFixed(1)}s
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-6 text-center text-xs md:text-sm text-gray-500">
                        <p>💡 Tip: Move mouse or touch screen to control the girl!</p>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Won Screen
    if (gameState === 'won') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 flex items-center justify-center px-4 py-8">
                {showConfetti && <Confetti />}

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl w-full"
                >
                    <Card className="text-center p-6 md:p-12">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="text-6xl md:text-8xl mb-6"
                        >
                            🏆
                        </motion.div>

                        <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4">
                            You Won! 🎉
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-700 mb-4">
                            Final Score: <span className="font-bold text-purple-600">{score}</span>
                        </p>

                        <div className="bg-pink-50 rounded-xl p-4 md:p-6 mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                                You caught all the sweetness! 💖
                            </h2>
                            <p className="text-base md:text-lg text-gray-700 mb-2">
                                Just like how I want to catch every moment with you...
                            </p>
                            <p className="text-lg md:text-xl font-semibold text-pink-600">
                                Happy Chocolate Day, my love! 🍫✨
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                            <Button onClick={resetGame} size="lg" className="gap-2">
                                <RotateCcw size={20} />
                                Play Again
                            </Button>
                        </div>
                    </Card>
                </motion.div>
            </div>
        );
    }

    // Playing Screen
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 flex flex-col items-center justify-center px-2 py-4 md:px-4 md:py-8">
            <div className="w-full max-w-md md:max-w-2xl">
                {/* Score Header */}
                <div className="flex justify-between items-center mb-3 gap-2">
                    <Card className="flex-1 text-center p-2 md:p-3">
                        <p className="text-xs md:text-sm text-gray-600">Score</p>
                        <p className="text-2xl md:text-3xl font-bold text-purple-600">{score}</p>
                    </Card>

                    <Card className="flex-1 text-center p-2 md:p-3">
                        <p className="text-xs md:text-sm text-gray-600">Goal</p>
                        <p className="text-2xl md:text-3xl font-bold text-pink-600">{WIN_SCORE}</p>
                    </Card>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-full h-3 md:h-4 mb-3 overflow-hidden shadow-inner">
                    <motion.div
                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((score / WIN_SCORE) * 100, 100)}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                {/* Game Area - FIXED HEIGHT */}
                <Card className="relative overflow-hidden bg-gradient-to-b from-sky-200 to-sky-100">
                    <div
                        ref={gameAreaRef}
                        className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] bg-gradient-to-b from-sky-300 to-green-100 touch-none"
                        onMouseMove={handleMouseMove}
                        onTouchMove={handleTouchMove}
                    >
                        {/* Falling Chocolates */}
                        <AnimatePresence>
                            {fallingChocolates.map(chocolate => (
                                <motion.div
                                    key={chocolate.id}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    className="absolute pointer-events-none"
                                    style={{
                                        left: `${chocolate.x}%`,
                                        top: `${chocolate.y}%`,
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: 'clamp(2rem, 8vw, 3rem)', // Responsive emoji size
                                    }}
                                >
                                    {chocolate.emoji}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Player (Girl) - ALWAYS VISIBLE */}
                        <motion.div
                            className="absolute pointer-events-none"
                            style={{
                                left: `${playerX}%`,
                                top: '75%',
                                transform: 'translateX(-50%)',
                                fontSize: 'clamp(2.5rem, 10vw, 4rem)', // Responsive player size
                            }}
                        >
                            <div className="select-none">
                                👧
                            </div>
                        </motion.div>

                        {/* Ground Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 md:h-2 bg-green-600" />
                    </div>
                </Card>

                {/* Controls Info */}
                <div className="text-center mt-3">
                    <p className="text-xs md:text-sm text-gray-600">
                        🖱️ Move mouse or touch to control • Catch chocolates!
                    </p>
                </div>
            </div>
        </div>
    );
};
