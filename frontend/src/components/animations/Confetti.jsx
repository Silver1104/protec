import React from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export const Confetti = ({ active = true, recycle = false }) => {
    const { width, height } = useWindowSize();

    if (!active) return null;

    return (
        <ReactConfetti
            width={width}
            height={height}
            recycle={recycle}
            numberOfPieces={200}
            colors={['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffe4e6']}
        />
    );
};
