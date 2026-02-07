import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { photosAPI } from '../utils/api';

export const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [category, setCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPhotos();
    }, [category]);

    const loadPhotos = async () => {
        setLoading(true);
        try {
            const res = await photosAPI.getAll(category === 'all' ? null : category);
            setPhotos(res.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const categories = [
        { id: 'all', name: 'All Photos', emoji: '📸' },
        { id: 'us', name: 'Us Together', emoji: '💕' },
        { id: 'personal', name: 'You', emoji: '😍' },
        { id: 'memories', name: 'Special Moments', emoji: '✨' },
    ];

    return (
        <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex gap-3 flex-wrap justify-center">
                {categories.map(cat => (
                    <motion.button
                        key={cat.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCategory(cat.id)}
                        className={`
              px-4 py-2 rounded-full font-semibold transition-all
              ${category === cat.id
                                ? 'bg-pink-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }
            `}
                    >
                        {cat.emoji} {cat.name}
                    </motion.button>
                ))}
            </div>

            {/* Photo Grid */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto" />
                </div>
            ) : photos.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">
                        No photos yet. Admin can upload photos! 📸
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={photo._id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSelectedPhoto(photo)}
                            className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
                        >
                            <img
                                src={photo.url}
                                alt={photo.caption}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />

                            {photo.starred && (
                                <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1">
                                    <Star size={16} fill="white" className="text-white" />
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-2 left-2 right-2">
                                    <p className="text-white text-sm font-semibold truncate">
                                        {photo.caption}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Photo Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedPhoto(null)}
                            className="fixed inset-0 bg-black/80 z-50"
                        />

                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setSelectedPhoto(null)}
                                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
                                >
                                    <X size={24} />
                                </button>

                                <img
                                    src={selectedPhoto.url}
                                    alt={selectedPhoto.caption}
                                    className="w-full max-h-[70vh] object-contain"
                                />

                                {selectedPhoto.caption && (
                                    <div className="p-6 bg-white">
                                        <p className="text-lg text-gray-800 text-center">
                                            {selectedPhoto.caption}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
