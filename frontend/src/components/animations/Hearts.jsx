import React from 'react';
import { motion } from 'framer-motion';

export const Hearts = ({ count = 10 }) => {
    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-4xl"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: window.innerHeight + 50,
                        opacity: 0,
                    }}
                    animate={{
                        y: -100,
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: 5 + Math.random() * 3,
                        delay: Math.random() * 2,
                        repeat: Infinity,
                        repeatDelay: Math.random() * 5,
                    }}
                >
                    ❤️
                </motion.div>
            ))}
        </div>
    );
};
