import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    className = '',
    ...props
}) => {
    const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-valentine-500 text-white hover:bg-valentine-600 focus:ring-valentine-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500',
        outline: 'border-2 border-valentine-500 text-valentine-500 hover:bg-valentine-50 focus:ring-valentine-500',
        ghost: 'text-valentine-500 hover:bg-valentine-50 focus:ring-valentine-500',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
    };

    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};
