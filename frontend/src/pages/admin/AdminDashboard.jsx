import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Heart, Gift, Star } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { adminAPI } from '../../utils/api';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { VALENTINE_WEEK, CHOCOLATES, PROMISES } from '../../utils/constants';
import toast from 'react-hot-toast';

export const AdminDashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeDay, setActiveDay] = useState(0);
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const res = await adminAPI.getDashboard();
            setData(res.data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load dashboard');
        }
        setLoading(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
        toast.success('Logged out');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500" />
            </div>
        );
    }

    const days = [
        { id: 0, name: 'Rose Day', emoji: '🌹' },
        { id: 1, name: 'Propose Day', emoji: '💍' },
        { id: 2, name: 'Chocolate Day', emoji: '🍫' },
        { id: 3, name: 'Teddy Day', emoji: '🧸' },
        { id: 4, name: 'Promise Day', emoji: '🤝' },
        { id: 5, name: 'Hug Day', emoji: '🤗' },
        { id: 6, name: 'Kiss Day', emoji: '💋' },
        { id: 7, name: "Valentine's Day", emoji: '❤️' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
                        <p className="text-gray-600">View all Valentine's Week data</p>
                    </div>
                    <Button onClick={handleLogout} variant="outline">
                        <LogOut size={20} className="mr-2" />
                        Logout
                    </Button>
                </div>

                {/* Day Tabs */}
                <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {days.map(day => (
                            <button
                                key={day.id}
                                onClick={() => setActiveDay(day.id)}
                                className={`
                  px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all
                  ${activeDay === day.id
                                        ? 'bg-pink-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }
                `}
                            >
                                {day.emoji} {day.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Day Content */}
                <div className="space-y-6">
                    {/* Rose Day */}
                    {activeDay === 0 && (
                        <Card>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">🌹 Rose Day</h2>
                            <p className="text-gray-600">
                                Rose animation displayed. No specific user data for this day.
                            </p>
                        </Card>
                    )}

                    {/* Propose Day */}
                    {activeDay === 1 && (
                        <Card>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">💍 Propose Day</h2>
                            {data?.puzzle ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <Star className="text-yellow-500" />
                                        <p className="text-lg">
                                            <strong>Puzzle Completed:</strong> {data.puzzle.completed ? 'Yes ✓' : 'Not yet'}
                                        </p>
                                    </div>
                                    {data.puzzle.completed && (
                                        <>
                                            <p><strong>Moves:</strong> {data.puzzle.moves}</p>
                                            <p><strong>Completed At:</strong> {new Date(data.puzzle.completedAt).toLocaleString()}</p>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-600">No puzzle data yet.</p>
                            )}
                        </Card>
                    )}

                    {/* Chocolate Day */}
                    {activeDay === 2 && (
                        <Card>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">🍫 Chocolate Day</h2>
                            {data?.choices?.find(c => c.day === 'chocolate') ? (
                                <div>
                                    <p className="text-lg mb-2">
                                        <strong>Selected Chocolate:</strong>
                                    </p>
                                    <div className="bg-pink-50 rounded-lg p-4 inline-block">
                                        <p className="text-2xl font-bold text-pink-600">
                                            {CHOCOLATES.find(ch => ch.id === data.choices.find(c => c.day === 'chocolate').choice)?.name || 'Unknown'}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-3">
                                        Selected at: {new Date(data.choices.find(c => c.day === 'chocolate').timestamp).toLocaleString()}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-gray-600">No chocolate selected yet.</p>
                            )}
                        </Card>
                    )}

                    {/* Teddy Day */}
                    {activeDay === 3 && (
                        <Card>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">🧸 Teddy Day</h2>
                            {data?.bear ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-bold mb-3">Bear Configuration:</h3>
                                        <div className="space-y-2">
                                            <p><strong>Body Color:</strong> <span className="inline-block w-6 h-6 rounded-full border-2" style={{ backgroundColor: data.bear.bodyColor }} /></p>
                                            <p><strong>Shirt Color:</strong> <span className="inline-block w-6 h-6 rounded-full border-2" style={{ backgroundColor: data.bear.shirtColor }} /></p>
                                            <p><strong>Pants Color:</strong> <span className="inline-block w-6 h-6 rounded-full border-2" style={{ backgroundColor: data.bear.pantsColor }} /></p>
                                            <p><strong>Shoes Color:</strong> <span className="inline-block w-6 h-6 rounded-full border-2" style={{ backgroundColor: data.bear.shoesColor }} /></p>
                                            <p><strong>Accessory:</strong> {data.bear.accessory}</p>
                                            {data.bear.name && <p><strong>Name:</strong> {data.bear.name} 💕</p>}
                                        </div>
                                    </div>
                                    <div className="bg-pink-50 rounded-lg p-4 flex items-center justify-center">
                                        <p className="text-6xl">🧸</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-600">No teddy bear created yet.</p>
                            )}
                        </Card>
                    )}

                    {/* Promise Day */}
                    {activeDay === 4 && (
                        <Card>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">🤝 Promise Day</h2>
                            <div className="space-y-3">
                                <p className="text-lg">
                                    <strong>Promises Read:</strong> {data?.promises?.length > 0 ? 'Yes ✓' : 'Not yet'}
                                </p>
                                {data?.promises?.length > 0 && (
                                    <p className="text-sm text-gray-600">
                                        Last read: {new Date(data.promises[0].timestamp).toLocaleString()}
                                    </p>
                                )}
                                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                                    <p className="text-sm font-semibold mb-2">Total Promises: {PROMISES.length}</p>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Hug Day */}
                    {activeDay === 5 && (
                        <Card>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">🤗 Hug Day</h2>
                            <div className="text-center">
                                <p className="text-sm text-gray-600 mb-2">Total Virtual Hugs Sent</p>
                                <motion.p
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="text-6xl font-bold text-orange-600"
                                >
                                    {data?.hugs?.count || 0}
                                </motion.p>
                                {data?.hugs?.lastHugDate && (
                                    <p className="text-sm text-gray-600 mt-3">
                                        Last hug: {new Date(data.hugs.lastHugDate).toLocaleString()}
                                    </p>
                                )}
                            </div>
                        </Card>
                    )}

                    {/* Kiss Day */}
                    {activeDay === 6 && (
                        <Card>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">💋 Kiss Day</h2>
                            {data?.choices?.find(c => c.day === 'kiss') ? (
                                <div>
                                    <p className="text-lg mb-2">
                                        <strong>Selected:</strong>
                                    </p>
                                    <div className="bg-red-50 rounded-lg p-6 inline-block">
                                        <p className="text-3xl font-bold text-red-600">
                                            {data.choices.find(c => c.day === 'kiss').choice === 'hersheys' ? "Hershey's Kisses 🍫" : "Your Kisses 💋"}
                                        </p>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-3">
                                        Selected at: {new Date(data.choices.find(c => c.day === 'kiss').timestamp).toLocaleString()}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-gray-600">No choice made yet.</p>
                            )}
                        </Card>
                    )}

                    {/* Valentine's Day */}
                    {activeDay === 7 && (
                        <div className="space-y-6">
                            {/* Video Stats */}
                            <Card>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">🎞️ Video Stats</h3>
                                <div className="space-y-2">
                                    <p><strong>Watched:</strong> {data?.video?.watched ? 'Yes ✓' : 'Not yet'}</p>
                                    <p><strong>Watch Count:</strong> {data?.video?.watchCount || 0}</p>
                                    {data?.video?.lastWatchedAt && (
                                        <p className="text-sm text-gray-600">
                                            Last watched: {new Date(data.video.lastWatchedAt).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            </Card>

                            {/* Stress Bust */}
                            <Card>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">💥 Stress Bust Stats</h3>
                                {data?.stress?.length > 0 ? (
                                    <div className="space-y-3">
                                        {data.stress.map(target => (
                                            <div key={target._id} className="bg-gray-50 rounded-lg p-3">
                                                <div className="flex justify-between items-center">
                                                    <p className="font-semibold">{target.targetName}</p>
                                                    <p className="text-2xl font-bold text-red-600">{target.hits}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No stress bust activity yet.</p>
                                )}
                            </Card>

                            {/* Photos */}
                            <Card>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">📸 Photo Gallery</h3>
                                <p><strong>Total Photos:</strong> {data?.photos?.length || 0}</p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Upload photos from admin panel to populate the gallery
                                </p>
                            </Card>

                            {/* Date Plans */}
                            <Card>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">🗓️ Date Plans</h3>
                                {data?.datePlans?.length > 0 ? (
                                    <div className="space-y-2">
                                        <p><strong>Total Plans:</strong> {data.datePlans.length}</p>
                                        <p><strong>Completed:</strong> {data.datePlans.filter(p => p.completed).length}</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No date plans created yet.</p>
                                )}
                            </Card>

                            {/* Aim Trainer */}
                            <Card>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">🎯 Aim Trainer</h3>
                                {data?.aimScores?.length > 0 ? (
                                    <div className="space-y-3">
                                        <p><strong>High Score:</strong> {Math.max(...data.aimScores.map(s => s.score))}</p>
                                        <p><strong>Best Accuracy:</strong> {Math.max(...data.aimScores.map(s => s.accuracy))}%</p>
                                        <p><strong>Total Games:</strong> {data.aimScores.length}</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No aim training sessions yet.</p>
                                )}
                            </Card>

                            {/* Period Tracker */}
                            <Card>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">📅 Period Tracker</h3>
                                <p><strong>Total Entries:</strong> {data?.periods?.length || 0}</p>
                            </Card>
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-red-50 to-pink-100 text-center">
                        <Heart className="mx-auto mb-2 text-red-500" size={32} />
                        <p className="text-sm text-gray-600">Total Hugs</p>
                        <p className="text-3xl font-bold text-red-600">{data?.hugs?.count || 0}</p>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-pink-100 text-center">
                        <Gift className="mx-auto mb-2 text-purple-500" size={32} />
                        <p className="text-sm text-gray-600">Activities Completed</p>
                        <p className="text-3xl font-bold text-purple-600">
                            {(data?.puzzle?.completed ? 1 : 0) +
                                (data?.choices?.length || 0) +
                                (data?.bear ? 1 : 0)}
                        </p>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 text-center">
                        <Star className="mx-auto mb-2 text-blue-500" size={32} />
                        <p className="text-sm text-gray-600">Total Interactions</p>
                        <p className="text-3xl font-bold text-blue-600">
                            {(data?.hugs?.count || 0) +
                                (data?.stress?.reduce((sum, s) => sum + s.hits, 0) || 0) +
                                (data?.video?.watchCount || 0)}
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};
