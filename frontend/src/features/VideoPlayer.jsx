import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { videoAPI } from '../utils/api';

export const VideoPlayer = () => {
    useEffect(() => {
        // Track video view
        videoAPI.markWatched().catch(err => console.error(err));
    }, []);

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
            >
                <p className="text-xl text-gray-700 mb-6">
                    I made this video especially for you. Watch it as many times as you want! 💕
                </p>
            </motion.div>

            {/* Video Player */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <video
                    src="/assets/videos/love-video.mp4"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                >
                    Your browser does not support the video tag.
                </video>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-red-50 rounded-xl p-6 text-center"
            >
                <p className="text-lg text-gray-700">
                    Every frame of this video was made with love.
                    You mean everything to me! ❤️
                </p>
            </motion.div>
        </div>
    );
};
