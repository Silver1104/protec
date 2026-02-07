import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center px-4">
            <div className="text-center">
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-9xl mb-6"
                >
                    💔
                </motion.div>

                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-2xl text-gray-600 mb-8">Page not found</p>

                <Button onClick={() => navigate('/')} size="lg">
                    <Home size={20} className="mr-2" />
                    Go Home
                </Button>
            </div>
        </div>
    );
};
