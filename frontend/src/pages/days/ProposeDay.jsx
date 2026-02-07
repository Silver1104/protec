import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Confetti } from '../../components/animations/Confetti';
import { puzzleAPI } from '../../utils/api';
import toast from 'react-hot-toast';

export const ProposeDay = () => {
    const [tiles, setTiles] = useState([]);
    const [moves, setMoves] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    // Ring image split into 8 tiles + 1 empty
    const solvedState = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    useEffect(() => {
        initializePuzzle();
    }, []);

    const initializePuzzle = () => {
        let shuffled = [...solvedState];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setTiles(shuffled);
        setMoves(0);
        setCompleted(false);
    };

    const getEmptyIndex = () => tiles.indexOf(8);

    const canMove = (index) => {
        const emptyIndex = getEmptyIndex();
        const row = Math.floor(index / 3);
        const col = index % 3;
        const emptyRow = Math.floor(emptyIndex / 3);
        const emptyCol = emptyIndex % 3;

        return (
            (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
            (col === emptyCol && Math.abs(row - emptyRow) === 1)
        );
    };

    const moveTile = (index) => {
        if (!canMove(index) || completed) return;

        const emptyIndex = getEmptyIndex();
        const newTiles = [...tiles];
        [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];

        setTiles(newTiles);
        setMoves(moves + 1);

        // Check if solved
        if (JSON.stringify(newTiles) === JSON.stringify(solvedState)) {
            setCompleted(true);
            setShowConfetti(true);

            puzzleAPI.complete({ moves: moves + 1 })
                .then(() => toast.success('Puzzle completed! 🎉'))
                .catch((err) => console.error(err));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100 py-12 px-4">
            <Confetti active={showConfetti} recycle={false} />

            <div className="container mx-auto text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-display text-purple-600 mb-4"
                >
                    💍 Propose Day 💍
                </motion.h1>

                <p className="text-xl text-gray-700 mb-8">
                    Solve the puzzle to reveal my proposal...
                </p>

                <div className="flex justify-center gap-4 mb-8">
                    <div className="bg-white rounded-lg px-6 py-3 shadow-md">
                        <p className="text-sm text-gray-600">Moves</p>
                        <p className="text-3xl font-bold text-purple-600">{moves}</p>
                    </div>
                    <Button onClick={initializePuzzle} variant="outline">
                        <Shuffle size={20} className="mr-2" />
                        Restart
                    </Button>
                </div>

                {/* Puzzle Grid */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-2xl shadow-2xl">
                        {tiles.map((tile, index) => (
                            <motion.div
                                key={index}
                                layout
                                onClick={() => moveTile(index)}
                                className={`
                  aspect-square rounded-lg overflow-hidden
                  ${tile === 8 ? 'bg-gray-100' : 'bg-gradient-to-br from-purple-400 to-pink-400 cursor-pointer'}
                  ${canMove(index) && tile !== 8 ? 'hover:scale-105' : ''}
                  transition-transform
                `}
                                whileHover={canMove(index) && tile !== 8 ? { scale: 1.05 } : {}}
                                whileTap={canMove(index) && tile !== 8 ? { scale: 0.95 } : {}}
                            >
                                {tile !== 8 && (
                                    <div
                                        className="w-full h-full flex items-center justify-center text-white font-bold text-4xl"
                                        style={{
                                            backgroundImage: 'url(/assets/images/ring-puzzle.jpg)',
                                            backgroundSize: '300% 300%',
                                            backgroundPosition: `${(tile % 3) * 50}% ${Math.floor(tile / 3) * 50}%`,
                                        }}
                                    >
                                        {/* Tile number for debugging */}
                                        {/* <span className="text-xs">{tile + 1}</span> */}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Proposal Message */}
                <AnimatePresence>
                    {completed && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-8xl mb-6"
                            >
                                💍
                            </motion.div>

                            <h2 className="text-4xl font-display text-purple-600 mb-4">
                                Will You Be My Valentine Forever?
                            </h2>

                            <p className="text-xl text-gray-700 mb-6">
                                You completed the puzzle, and you complete me. ❤️
                                <br />
                                Every day with you is a piece of my perfect life.
                                <br />
                                I love you more than words can express!
                            </p>

                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <p className="text-2xl font-bold text-red-600">
                                    You are my forever! 💕
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
