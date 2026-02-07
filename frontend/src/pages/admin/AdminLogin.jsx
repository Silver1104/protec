import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { authAPI } from '../../utils/api';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuthContext();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            console.log('Attempting login...'); // Debug
            const res = await authAPI.login(formData);
            console.log('Login response:', res.data); // Debug

            login(res.data, res.data.token);
            toast.success('Welcome back!');
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center px-4 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-6xl mb-4"
                    >
                        🔐
                    </motion.div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
                    <p className="text-gray-600">Access the admin dashboard</p>
                    <p className="text-sm text-gray-500 mt-2">
                        This is a protected area for admin access only.
                    </p>
                </div>

                <Card>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="admin@example.com"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full" size="lg">
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800 font-semibold mb-2">
                            📝 First time? Create admin account:
                        </p>
                        <p className="text-xs text-blue-600 font-mono">
                            POST http://localhost:5000/api/auth/register
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                            Body: {JSON.stringify({ name: "Admin", email: "admin@example.com", password: "admin123" })}
                        </p>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};
