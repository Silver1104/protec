import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({
    children,
    className = '',
    hover = true,
    onClick,
    ...props
}) => {
    return (
        <motion.div
            whileHover={hover ? { scale: 1.02, y: -5 } : {}}
            className={`bg-white rounded-xl shadow-lg p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.div>
    );
};
