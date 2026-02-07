import React from 'react';
import { motion } from 'framer-motion';

export const Sparkles = ({ children }) => {
    return (
        <div className="relative inline-block">
            {children}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                    style={{
                        top: '50%',
                        left: '50%',
                    }}
                    animate={{
                        x: [0, Math.cos((i * Math.PI) / 4) * 30],
                        y: [0, Math.sin((i * Math.PI) / 4) * 30],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 1,
                        delay: i * 0.1,
                    }}
                />
            ))}
        </div>
    );
};
