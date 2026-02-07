import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { periodAPI } from '../utils/api';
import toast from 'react-hot-toast';

export const PeriodTracker = () => {
    const [periods, setPeriods] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        symptoms: [],
        mood: 'normal',
        notes: '',
    });

    const symptomOptions = [
        'Cramps', 'Headache', 'Bloating', 'Fatigue', 'Mood Swings',
        'Acne', 'Back Pain', 'Breast Tenderness', 'Nausea'
    ];

    const moodOptions = [
        { value: 'happy', emoji: '😊', label: 'Happy' },
        { value: 'sad', emoji: '😢', label: 'Sad' },
        { value: 'angry', emoji: '😠', label: 'Angry' },
        { value: 'anxious', emoji: '😰', label: 'Anxious' },
        { value: 'normal', emoji: '😐', label: 'Normal' },
    ];

    useEffect(() => {
        loadPeriods();
    }, []);

    const loadPeriods = async () => {
        try {
            const res = await periodAPI.getAll();
            setPeriods(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await periodAPI.update(editingId, formData);
                toast.success('Period entry updated!');
            } else {
                await periodAPI.create(formData);
                toast.success('Period entry created!');
            }

            setFormData({
                startDate: '',
                endDate: '',
                symptoms: [],
                mood: 'normal',
                notes: '',
            });
            setShowForm(false);
            setEditingId(null);
            loadPeriods();
        } catch (error) {
            console.error(error);
            toast.error('Failed to save entry');
        }
    };

    const handleEdit = (period) => {
        setFormData({
            startDate: period.startDate.split('T')[0],
            endDate: period.endDate ? period.endDate.split('T')[0] : '',
            symptoms: period.symptoms || [],
            mood: period.mood || 'normal',
            notes: period.notes || '',
        });
        setEditingId(period._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this period entry?')) {
            try {
                await periodAPI.delete(id);
                toast.success('Entry deleted');
                loadPeriods();
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete');
            }
        }
    };

    const toggleSymptom = (symptom) => {
        setFormData({
            ...formData,
            symptoms: formData.symptoms.includes(symptom)
                ? formData.symptoms.filter(s => s !== symptom)
                : [...formData.symptoms, symptom]
        });
    };

    const calculateCycleLength = (period) => {
        if (!period.endDate) return null;
        const start = new Date(period.startDate);
        const end = new Date(period.endDate);
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return days;
    };

    const predictNextPeriod = () => {
        if (periods.length < 2) return null;

        const recentPeriods = periods.slice(0, 3);
        const avgCycleLength = recentPeriods.reduce((sum, period, index) => {
            if (index === 0) return sum;
            const prev = new Date(recentPeriods[index - 1].startDate);
            const curr = new Date(period.startDate);
            return sum + Math.ceil((prev - curr) / (1000 * 60 * 60 * 24));
        }, 0) / (recentPeriods.length - 1);

        const lastPeriod = new Date(periods[0].startDate);
        const nextPeriod = new Date(lastPeriod);
        nextPeriod.setDate(nextPeriod.getDate() + Math.round(avgCycleLength));

        return nextPeriod;
    };

    const nextPrediction = predictNextPeriod();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Period Tracker</h2>
                    <p className="text-gray-600">Track your cycle and symptoms 💕</p>
                </div>

                <Button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingId(null);
                        setFormData({
                            startDate: '',
                            endDate: '',
                            symptoms: [],
                            mood: 'normal',
                            notes: '',
                        });
                    }}
                    variant={showForm ? 'outline' : 'primary'}
                >
                    {showForm ? <X size={20} /> : <Plus size={20} />}
                    <span className="ml-2">{showForm ? 'Cancel' : 'New Entry'}</span>
                </Button>
            </div>

            {/* Prediction Card */}
            {nextPrediction && (
                <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200">
                    <div className="text-center">
                        <p className="text-sm text-gray-600 mb-2">Next Period Prediction</p>
                        <p className="text-2xl font-bold text-pink-600">
                            {nextPrediction.toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Based on your last {Math.min(3, periods.length)} cycles
                        </p>
                    </div>
                </Card>
            )}

            {/* Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <Card>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Start Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            required
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            End Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Symptoms
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {symptomOptions.map(symptom => (
                                            <button
                                                key={symptom}
                                                type="button"
                                                onClick={() => toggleSymptom(symptom)}
                                                className={`
                          px-4 py-2 rounded-full text-sm font-semibold transition-all
                          ${formData.symptoms.includes(symptom)
                                                        ? 'bg-pink-500 text-white'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }
                        `}
                                            >
                                                {symptom}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Mood
                                    </label>
                                    <div className="flex gap-3">
                                        {moodOptions.map(mood => (
                                            <button
                                                key={mood.value}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, mood: mood.value })}
                                                className={`
                          flex-1 py-3 rounded-lg font-semibold transition-all
                          ${formData.mood === mood.value
                                                        ? 'bg-pink-500 text-white scale-105'
                                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }
                        `}
                                            >
                                                <div className="text-2xl mb-1">{mood.emoji}</div>
                                                <div className="text-xs">{mood.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Notes
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Any additional notes..."
                                        rows={3}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none resize-none"
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    {editingId ? 'Update Entry' : 'Save Entry'}
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Entries List */}
            {periods.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">
                        No entries yet. Add your first period entry! 📅
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {periods.map((period, index) => {
                        const cycleLength = calculateCycleLength(period);
                        const moodData = moodOptions.find(m => m.value === period.mood);

                        return (
                            <motion.div
                                key={period._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="text-3xl">{moodData?.emoji}</div>
                                                <div>
                                                    <p className="text-lg font-bold text-gray-800">
                                                        {new Date(period.startDate).toLocaleDateString('en-US', {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                        {period.endDate && (
                                                            <> - {new Date(period.endDate).toLocaleDateString('en-US', {
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}</>
                                                        )}
                                                    </p>
                                                    {cycleLength && (
                                                        <p className="text-sm text-gray-600">
                                                            Duration: {cycleLength} days
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {period.symptoms && period.symptoms.length > 0 && (
                                                <div className="mb-3">
                                                    <p className="text-sm font-semibold text-gray-700 mb-2">Symptoms:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {period.symptoms.map(symptom => (
                                                            <span
                                                                key={symptom}
                                                                className="px-3 py-1 bg-pink-100 text-pink-700 text-sm rounded-full"
                                                            >
                                                                {symptom}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {period.notes && (
                                                <p className="text-gray-600 italic">
                                                    💭 {period.notes}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(period)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(period._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
