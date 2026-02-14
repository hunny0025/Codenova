import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Loader2, Chrome } from 'lucide-react';
import { Link } from 'react-router-dom';

const Signup = ({ onSignup }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            title: 'Plan Your Weekly Meals',
            description: 'Create personalized meal plans with AI assistance',
            component: 'MealPlanner'
        },
        {
            title: 'Smart Pantry Management',
            description: 'Find recipes based on ingredients you already have',
            component: 'PantryManager'
        },
        {
            title: 'Health Goal Tracking',
            description: 'Monitor your nutrition and achieve your wellness goals',
            component: 'HealthGoals'
        }
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            onSignup({ email: formData.email, name: formData.name });
            setLoading(false);
        }, 1500);
    };

    const handleGoogleSignup = () => {
        setLoading(true);
        setTimeout(() => {
            onSignup({ email: 'user@gmail.com', name: 'Google User' });
            setLoading(false);
        }, 1500);
    };

    // Mini UI Components for Carousel
    const MealPlanner = () => (
        <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-6">
            <div className="mb-4">
                <h3 className="font-bold text-gray-800 mb-2">This Week's Plan</h3>
                <p className="text-xs text-gray-500">Drag to rearrange meals</p>
            </div>

            <div className="space-y-3">
                {[
                    { day: 'Monday', meal: 'Palak Paneer', time: 'Lunch', emoji: '🥬', color: 'from-green-400 to-emerald-500' },
                    { day: 'Tuesday', meal: 'Chicken Biryani', time: 'Dinner', emoji: '🍛', color: 'from-amber-400 to-orange-500' },
                    { day: 'Wednesday', meal: 'Masala Dosa', time: 'Breakfast', emoji: '🥞', color: 'from-yellow-400 to-amber-500' }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl hover:shadow-md transition-shadow cursor-move"
                    >
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-2xl`}>
                            {item.emoji}
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-800 text-sm">{item.day}</p>
                            <p className="text-xs text-gray-600">{item.meal} • {item.time}</p>
                        </div>
                        <div className="text-gray-400">⋮⋮</div>
                    </motion.div>
                ))}
            </div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold text-sm"
            >
                + Add New Meal
            </motion.button>
        </div>
    );

    const PantryManager = () => (
        <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-6">
            <div className="mb-4">
                <h3 className="font-bold text-gray-800 mb-2">Your Pantry</h3>
                <p className="text-xs text-gray-500">12 ingredients available</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                    { name: 'Tomatoes', emoji: '🍅', qty: '5' },
                    { name: 'Onions', emoji: '🧅', qty: '3' },
                    { name: 'Rice', emoji: '🍚', qty: '2kg' },
                    { name: 'Lentils', emoji: '🫘', qty: '500g' },
                    { name: 'Spices', emoji: '🌶️', qty: '✓' },
                    { name: 'Paneer', emoji: '🧈', qty: '200g' }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-3 text-center"
                    >
                        <div className="text-3xl mb-1">{item.emoji}</div>
                        <p className="text-xs font-semibold text-gray-700">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.qty}</p>
                    </motion.div>
                ))}
            </div>

            <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-xl p-4 text-white">
                <p className="font-semibold mb-1">🎯 Recipes You Can Make</p>
                <p className="text-sm opacity-90">Paneer Tikka Masala, Dal Tadka, Tomato Rice</p>
            </div>
        </div>
    );

    const HealthGoals = () => (
        <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-2xl p-6">
            <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-2">Your Goals</h3>
                <p className="text-xs text-gray-500">Track your progress daily</p>
            </div>

            <div className="space-y-4">
                {[
                    { goal: 'Weight Loss', current: 72, target: 68, unit: 'kg', progress: 60, color: 'from-blue-500 to-cyan-500' },
                    { goal: 'Daily Steps', current: 8500, target: 10000, unit: 'steps', progress: 85, color: 'from-green-500 to-emerald-500' },
                    { goal: 'Water Intake', current: 6, target: 8, unit: 'glasses', progress: 75, color: 'from-cyan-400 to-blue-500' }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.15 }}
                        className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <p className="font-semibold text-gray-800 text-sm">{item.goal}</p>
                                <p className="text-xs text-gray-500">
                                    {item.current} / {item.target} {item.unit}
                                </p>
                            </div>
                            <span className="text-sm font-bold text-gray-700">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.progress}%` }}
                                transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}
                                className={`bg-gradient-to-r ${item.color} h-2 rounded-full`}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 flex gap-2">
                <button className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold text-sm">
                    Update Progress
                </button>
            </div>
        </div>
    );

    const renderSlideComponent = (componentName) => {
        switch (componentName) {
            case 'MealPlanner':
                return <MealPlanner />;
            case 'PantryManager':
                return <PantryManager />;
            case 'HealthGoals':
                return <HealthGoals />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Right side - Form (on mobile, this appears first) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-900 order-2 lg:order-1">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Logo & Title */}
                    <div className="mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', duration: 0.6 }}
                            className="mb-6"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-3xl shadow-lg">
                                🍽️
                            </div>
                        </motion.div>
                        <h1 className="text-4xl font-display font-bold text-white mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-400 text-lg">Join FlavourFit today</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-600 bg-slate-800 focus:border-rose-500 focus:outline-none transition-colors text-white placeholder-gray-500"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-600 bg-slate-800 focus:border-rose-500 focus:outline-none transition-colors text-white placeholder-gray-500"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-slate-600 bg-slate-800 focus:border-rose-500 focus:outline-none transition-colors text-white placeholder-gray-500"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-slate-600 bg-slate-800 focus:border-rose-500 focus:outline-none transition-colors text-white placeholder-gray-500"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:shadow-lg hover:shadow-rose-500/50 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg mt-6"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Creating account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </motion.button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-slate-900 text-gray-500">or</span>
                            </div>
                        </div>

                        {/* Google Signup */}
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={handleGoogleSignup}
                            disabled={loading}
                            className="w-full py-4 bg-slate-800 border-2 border-slate-700 hover:border-slate-600 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-3"
                        >
                            <Chrome className="w-5 h-5" />
                            Sign up with Google
                        </motion.button>

                        {/* Login Link */}
                        <p className="text-center text-gray-600 text-sm mt-6">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-rose-500 hover:text-rose-400 font-semibold transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>

            {/* Left side - Feature Showcase */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden order-1 lg:order-2">
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            className="text-center w-full"
                        >
                            {/* UI Mockup */}
                            <div className="mb-8">
                                {renderSlideComponent(slides[currentSlide].component)}
                            </div>

                            {/* Title & Description */}
                            <h2 className="text-3xl font-display font-bold mb-4 bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
                                {slides[currentSlide].title}
                            </h2>
                            <p className="text-gray-600 text-lg max-w-md mx-auto">
                                {slides[currentSlide].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Carousel Dots */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-rose-500 w-8' : 'bg-slate-600'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Signup;
