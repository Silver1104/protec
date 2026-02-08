import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Confetti } from '../../components/animations/Confetti';
import { puzzleAPI } from '../../utils/api';
import toast from 'react-hot-toast';
import ringImage from '../../assets/images/ring-puzzle.png';

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
        // Shuffle until we get a solvable puzzle
        let shuffled = shuffleArray([...solvedState]);
        while (!isSolvable(shuffled)) {
            shuffled = shuffleArray([...solvedState]);
        }
        setTiles(shuffled);
        setMoves(0);
        setCompleted(false);
        setShowConfetti(false);
    };

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Check if puzzle is solvable (important for 8-puzzle)
    const isSolvable = (puzzle) => {
        let inversions = 0;
        const arr = puzzle.filter(val => val !== 8);
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] > arr[j]) inversions++;
            }
        }
        return inversions % 2 === 0;
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
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-purple-50 p-4 flex items-center justify-center">
            {showConfetti && <Confetti />}

            <div className="max-w-2xl w-full space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-pink-600">
                        Propose Day Puzzle 💍
                    </h1>
                    <p className="text-gray-600">
                        Solve the puzzle to reveal my proposal...
                    </p>
                </div>

                {/* Puzzle grid */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 space-y-6">
                    <div className="grid grid-cols-3 gap-1 w-[400px] h-[400px] mx-auto bg-gray-800 p-1 rounded-xl">
                        {tiles.map((tile, index) => {
                            const isEmpty = tile === 8;

                            // Calculate which piece of the image this tile should show
                            // tile tells us which piece (0-8), we need to know its position in the solved puzzle
                            const tileRow = Math.floor(tile / 3); // 0, 1, or 2
                            const tileCol = tile % 3; // 0, 1, or 2

                            // For a 3x3 grid, each tile shows 1/3 of the image
                            // Position 0 = 0%, Position 1 = 50%, Position 2 = 100%
                            const bgPosX = tileCol * 50;
                            const bgPosY = tileRow * 50;

                            return (
                                <motion.button
                                    key={index}
                                    onClick={() => moveTile(index)}
                                    disabled={isEmpty || completed}
                                    className={`
                                        relative rounded-lg overflow-hidden
                                        ${isEmpty
                                            ? 'bg-gray-700 cursor-default'
                                            : 'cursor-pointer hover:opacity-90 shadow-lg'
                                        }
                                        ${canMove(index) && !isEmpty && !completed ? 'ring-2 ring-pink-400 ring-offset-2' : ''}
                                        transition-all duration-200
                                    `}
                                    whileTap={!isEmpty && !completed ? { scale: 0.95 } : {}}
                                    layout
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    {!isEmpty && (
                                        <div
                                            className="w-full h-full"
                                            style={{
                                                backgroundImage: `url(${ringImage})`,
                                                backgroundSize: '300% 300%',
                                                backgroundPosition: `${bgPosX}% ${bgPosY}%`,
                                                backgroundRepeat: 'no-repeat'
                                            }}
                                        />
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-center">
                            <p className="text-sm text-gray-500">Moves</p>
                            <p className="text-2xl font-bold text-pink-600">{moves}</p>
                        </div>

                        <Button
                            onClick={initializePuzzle}
                            variant="outline"
                            className="gap-2"
                            disabled={completed}
                        >
                            <Shuffle className="w-4 h-4" />
                            Shuffle
                        </Button>
                    </div>
                </div>

                {/* Proposal text */}
                <AnimatePresence>
                    {completed ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-xl p-8 text-center space-y-4"
                        >
                            <h2 className="text-3xl font-bold text-pink-600">
                                You completed the puzzle, and you complete me. ❤️
                            </h2>
                            <p className="text-xl text-gray-700">
                                Happy Propose Day, love.
                            </p>
                            <p className="text-lg text-pink-500 font-medium">
                                You are my end. You are my forever! 💕
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center space-y-2"
                        >
                            <h3 className="text-xl font-semibold text-gray-700">
                                Can you solve it?
                            </h3>
                            <p className="text-gray-500">
                                Slide the tiles to re-create the ring and unlock my proposal.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
