import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Hearts } from '../../components/animations/Hearts';
import { Confetti } from '../../components/animations/Confetti';
import wrist from '../../assets/images/wrist.png'
import slots1 from '../../assets/images/slots1.png'
import slots2 from '../../assets/images/slots2.png'
import slots3 from '../../assets/images/slots3.png'
import slots4 from '../../assets/images/slots4.png'
import slots5 from '../../assets/images/slots5.png'
import slots6 from '../../assets/images/slots6.png'
import slots7 from '../../assets/images/slots7.png'
import slots8 from '../../assets/images/slots8.png'
import kinks from '../../assets/images/kinks.png'
import past from '../../assets/images/past.png'
export const ValentineDay = () => {
    // Carousel items - Replace with your actual media URLs
    const carouselItems = [
        {
            type: 'image',
            src: wrist,
            alt: 'Us together',
        },
        {
            type: 'video',
            src: 'https://www.w3schools.com/html/mov_bbb.mp4',
            alt: 'Our video memory',
        },
        {
            type: 'image',
            src: kinks,
            alt: 'Sweet moment',
        },
        {
            type: 'image',
            src: past,
            alt: 'Another memory',
        },
        {
            type: 'video',
            src: 'https://www.w3schools.com/html/movie.mp4',
            alt: 'Special video',
        },
    ];

    // Scattered images above carousel (4 images, larger size)
    const topImages = [
        { src: slots1, rotate: -8 },
        { src: slots2, rotate: 5 },
        { src: slots3, rotate: -3 },
        { src: slots4, rotate: 7 },
    ];

    // Scattered images below carousel (4 images, larger size)
    const bottomImages = [
        { src: slots5, rotate: 4 },
        { src: slots6, rotate: -6 },
        { src: slots7, rotate: 8 },
        { src: slots8, rotate: -4 },
    ];

    const [activeIndex, setActiveIndex] = React.useState(0);
    const [direction, setDirection] = React.useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);

    const nextSlide = React.useCallback(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % carouselItems.length);
    }, [carouselItems.length]);

    const prevSlide = () => {
        setDirection(-1);
        setActiveIndex((prev) =>
            prev === 0 ? carouselItems.length - 1 : prev - 1
        );
    };

    const goToSlide = (index) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    const currentItem = carouselItems[activeIndex];

    // Reset video playing state when slide changes
    React.useEffect(() => {
        setIsVideoPlaying(false);
    }, [activeIndex]);

    // Auto-rotate carousel (floating style rotation)
    React.useEffect(() => {
        // Do not auto-rotate while a video is actively playing
        if (isVideoPlaying) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 7000); // 7 seconds per slide

        return () => clearInterval(interval);
    }, [isVideoPlaying, nextSlide]);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 overflow-hidden">
            {/* Background animations */}
            <Hearts />
            <Confetti />

            {/* Floating hearts decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-rose-300/20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            fontSize: `${Math.random() * 30 + 20}px`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center px-4 py-8 md:py-16 max-w-7xl mx-auto">
                {/* Romantic Message */}
                <motion.div
                    className="text-center mb-12 max-w-3xl"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.div
                        className="inline-block mb-4"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 mb-6">
                        Happy Valentine&apos;s Day
                    </h1>

                    <motion.p
                        className="text-lg md:text-xl text-rose-800/90 leading-relaxed font-medium px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        To my dearest love, every moment with you is a treasure.
                        This collection of our memories is just a small glimpse of
                        the infinite love I have for you. You make every day feel
                        like Valentine&apos;s Day. 💕
                    </motion.p>
                </motion.div>

                {/* Top Scattered Images (4 images, bigger size) */}
                <motion.div
                    className="w-full flex flex-wrap justify-center items-center gap-6 md:gap-8 mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {topImages.map((img, idx) => (
                        <motion.div
                            key={`top-${idx}`}
                            className="relative group"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.12, rotate: 0, zIndex: 10 }}
                            style={{
                                rotate: img.rotate,
                            }}
                        >
                            {/* Larger size: 48 (192px) on mobile, 56 (224px) on desktop */}
                            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 backdrop-blur-sm bg-white/50">
                                <img
                                    src={img.src}
                                    alt={`Memory ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1 rounded text-xs font-handwriting text-rose-600 whitespace-nowrap shadow-md">
                                ♥ Meme {idx + 1}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Central Carousel - floating style + auto-rotate */}
                <motion.div
                    className="relative w-full max-w-4xl mb-10"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -6, 0],        // gentle floating
                        boxShadow: [
                            '0 25px 60px rgba(244, 63, 94, 0.25)',
                            '0 30px 70px rgba(244, 63, 94, 0.35)',
                            '0 25px 60px rgba(244, 63, 94, 0.25)',
                        ],
                    }}
                    transition={{
                        opacity: { duration: 0.8, delay: 0.8 },
                        scale: { duration: 0.8, delay: 0.8 },
                        y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                        boxShadow: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
                    }}
                >
                    <div className="relative bg-gradient-to-br from-rose-200/60 to-pink-200/60 backdrop-blur-xl rounded-3xl border-4 border-white/60 overflow-hidden p-3 md:p-4">
                        {/* Carousel Container */}
                        <div className="relative aspect-video bg-gradient-to-br from-rose-900/90 to-pink-900/90 rounded-2xl overflow-hidden">
                            <AnimatePresence initial={false} custom={direction} mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: 'spring', stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 },
                                    }}
                                    className="absolute inset-0"
                                >
                                    {currentItem.type === 'image' ? (
                                        <img
                                            src={currentItem.src}
                                            alt={currentItem.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <video
                                            key={currentItem.src}
                                            src={currentItem.src}
                                            className="w-full h-full object-cover"
                                            controls
                                            autoPlay={false}
                                            onPlay={() => setIsVideoPlaying(true)}
                                            onPause={() => setIsVideoPlaying(false)}
                                            onEnded={() => setIsVideoPlaying(false)}
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md text-white rounded-full p-2 md:p-3 transition-all hover:scale-110 active:scale-95 shadow-lg group"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-[-2px] transition-transform" />
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md text-white rounded-full p-2 md:p-3 transition-all hover:scale-110 active:scale-95 shadow-lg group"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-[2px] transition-transform" />
                            </button>

                            {/* Slide Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {carouselItems.map((_, idx) => (
                                    <motion.button
                                        key={idx}
                                        onClick={() => goToSlide(idx)}
                                        className={`rounded-full transition-all ${idx === activeIndex
                                            ? 'bg-rose-400 w-8 h-3'
                                            : 'bg-white/60 hover:bg-white/80 w-3 h-3'
                                            }`}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label={`Go to slide ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Slide Counter */}
                            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium">
                                {activeIndex + 1} / {carouselItems.length}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Scattered Images (4 images, bigger size) */}
                <motion.div
                    className="w-full flex flex-wrap justify-center items-center gap-6 md:gap-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    {bottomImages.map((img, idx) => (
                        <motion.div
                            key={`bottom-${idx}`}
                            className="relative group"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.1 + idx * 0.1, duration: 0.5 }}
                            whileHover={{ scale: 1.12, rotate: 0, zIndex: 10 }}
                            style={{
                                rotate: img.rotate,
                            }}
                        >
                            {/* Larger size: 48 (192px) on mobile, 56 (224px) on desktop */}
                            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80 backdrop-blur-sm bg-white/50">
                                <img
                                    src={img.src}
                                    alt={`Memory ${idx + 5}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1 rounded text-xs font-handwriting text-rose-600 whitespace-nowrap shadow-md">
                                ♥ Meme {idx + 5}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer Message */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    <p className="text-rose-700 text-lg md:text-xl font-medium">
                        Forever yours, always ❤️
                    </p>
                </motion.div>
            </div>
        </div>
    );
};
