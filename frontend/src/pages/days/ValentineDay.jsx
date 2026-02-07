import React from 'react';
import { motion } from 'framer-motion';
import { Play, Target, Calendar, Heart, Camera, Activity } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Hearts } from '../../components/animations/Hearts';
import { Confetti } from '../../components/animations/Confetti';
import { VideoPlayer } from '../../features/VideoPlayer';
import { StressBust } from '../../features/StressBust';
import { PhotoGallery } from '../../features/PhotoGallery';
import { DatePlanner } from '../../features/DatePlanner';
import { AimTrainer } from '../../features/AimTrainer';
import { PeriodTracker } from '../../features/PeriodTracker';
import { Modal } from '../../components/ui/Modal';

export const ValentineDay = () => {
    const [activeFeature, setActiveFeature] = React.useState(null);

    const features = [
        {
            id: 'video',
            title: 'My Video for You',
            icon: Play,
            color: 'from-red-400 to-pink-500',
            emoji: '🎞️',
            component: VideoPlayer,
        },
        {
            id: 'stress',
            title: 'Stress Buster',
            icon: Activity,
            color: 'from-orange-400 to-red-500',
            emoji: '💥',
            component: StressBust,
        },
        {
            id: 'photos',
            title: 'Our Memories',
            icon: Camera,
            color: 'from-purple-400 to-pink-500',
            emoji: '📸',
            component: PhotoGallery,
        },
        {
            id: 'dateplanner',
            title: 'Plan Our Day',
            icon: Calendar,
            color: 'from-blue-400 to-indigo-500',
            emoji: '🗓️',
            component: DatePlanner,
        },
        {
            id: 'aimtrainer',
            title: 'Aim Trainer',
            icon: Target,
            color: 'from-green-400 to-teal-500',
            emoji: '🎯',
            component: AimTrainer,
        },
        {
            id: 'period',
            title: 'Period Tracker',
            icon: Heart,
            color: 'from-pink-400 to-rose-500',
            emoji: '📅',
            component: PeriodTracker,
        },
    ];

    const ActiveComponent = activeFeature ? features.find(f => f.id === activeFeature)?.component : null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-red-50 via-pink-50 to-purple-50 py-12 px-4 relative overflow-hidden">
            <Confetti active={true} recycle={true} />
            <Hearts count={20} />

            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <motion.h1
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-6xl md:text-7xl font-display text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 mb-4"
                    >
                        ❤️ Happy Valentine's Day! ❤️
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl text-gray-700 max-w-3xl mx-auto"
                    >
                        I've prepared something special for you. Explore all the activities below! 💕
                    </motion.p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card
                                hover={true}
                                onClick={() => setActiveFeature(feature.id)}
                                className="cursor-pointer h-full relative overflow-hidden group"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                                <div className="relative z-10">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="text-6xl mb-4"
                                    >
                                        {feature.emoji}
                                    </motion.div>

                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                        {feature.title}
                                    </h3>

                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${feature.color} text-white`}>
                                        <feature.icon size={20} />
                                        <span>Open</span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Feature Modal */}
                <Modal
                    isOpen={!!activeFeature}
                    onClose={() => setActiveFeature(null)}
                    title={features.find(f => f.id === activeFeature)?.title || ''}
                    size="xl"
                >
                    {ActiveComponent && <ActiveComponent />}
                </Modal>
            </div>
        </div>
    );
};
