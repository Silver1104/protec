import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { datePlanAPI } from '../utils/api';
import toast from 'react-hot-toast';

export const DatePlanner = () => {
    const [plans, setPlans] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        activity: '',
        place: '',
        notes: '',
    });

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        try {
            const res = await datePlanAPI.getAll();
            setPlans(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingId) {
                await datePlanAPI.update(editingId, formData);
                toast.success('Date plan updated!');
            } else {
                await datePlanAPI.create(formData);
                toast.success('Date plan created!');
            }

            setFormData({ date: '', time: '', activity: '', place: '', notes: '' });
            setShowForm(false);
            setEditingId(null);
            loadPlans();
        } catch (error) {
            console.error(error);
            toast.error('Failed to save date plan');
        }
    };

    const handleEdit = (plan) => {
        setFormData({
            date: plan.date.split('T')[0],
            time: plan.time,
            activity: plan.activity,
            place: plan.place,
            notes: plan.notes,
        });
        setEditingId(plan._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this date plan?')) {
            try {
                await datePlanAPI.delete(id);
                toast.success('Date plan deleted');
                loadPlans();
            } catch (error) {
                console.error(error);
                toast.error('Failed to delete');
            }
        }
    };

    const toggleCompleted = async (plan) => {
        try {
            await datePlanAPI.update(plan._id, { completed: !plan.completed });
            loadPlans();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Our Date Plans</h2>
                    <p className="text-gray-600">Let's plan our perfect days together! 💕</p>
                </div>

                <Button
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingId(null);
                        setFormData({ date: '', time: '', activity: '', place: '', notes: '' });
                    }}
                    variant={showForm ? 'outline' : 'primary'}
                >
                    {showForm ? <X size={20} /> : <Plus size={20} />}
                    <span className="ml-2">{showForm ? 'Cancel' : 'New Plan'}</span>
                </Button>
            </div>

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
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            required
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Time
                                        </label>
                                        <input
                                            type="time"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            required
                                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Activity
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.activity}
                                        onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                                        placeholder="e.g., Dinner at favorite restaurant"
                                        required
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Place
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.place}
                                        onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                                        placeholder="e.g., Nando's Restaurant"
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Notes
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Any special notes or reminders..."
                                        rows={3}
                                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none resize-none"
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    {editingId ? 'Update Plan' : 'Create Plan'}
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Plans List */}
            {plans.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-600">
                        No date plans yet. Create one to get started! 📅
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className={`${plan.completed ? 'bg-green-50 border-2 border-green-300' : ''}`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <button
                                                onClick={() => toggleCompleted(plan)}
                                                className={`
                          w-6 h-6 rounded-full border-2 flex items-center justify-center
                          ${plan.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'}
                          hover:scale-110 transition-transform
                        `}
                                            >
                                                {plan.completed && <Check size={16} className="text-white" />}
                                            </button>

                                            <div>
                                                <h3 className={`text-xl font-bold ${plan.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                                    {plan.activity}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    📅 {new Date(plan.date).toLocaleDateString('en-US', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })} at {plan.time}
                                                </p>
                                            </div>
                                        </div>

                                        {plan.place && (
                                            <p className="text-gray-700 mb-2">
                                                📍 {plan.place}
                                            </p>
                                        )}

                                        {plan.notes && (
                                            <p className="text-gray-600 italic">
                                                💭 {plan.notes}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(plan)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit2 size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(plan._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};
