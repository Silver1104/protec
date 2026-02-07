import React from 'react';
import { Heart } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-gray-100 py-6 mt-12">
            <div className="container mx-auto text-center">
                <p className="text-gray-600 flex items-center justify-center gap-2">
                    Made with <Heart size={16} fill="red" className="text-red-500" /> for my Valentine
                </p>
                <p className="text-gray-400 text-sm mt-2">© 2026 Valentine Week</p>
            </div>
        </footer>
    );
};
