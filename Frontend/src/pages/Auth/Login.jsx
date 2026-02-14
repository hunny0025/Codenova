import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader2, Chrome } from 'lucide-react';
import { Link } from 'react-router-dom';

// Move slides outside component to prevent re-creation on every render
const CAROUSEL_SLIDES = [
    {
        title: 'Discover Regional Flavors',
        description: 'Explore authentic recipes from 28 Indian states',
        component: 'RecipeGrid'
    },
    {
        title: 'AI-Powered Recommendations',
        description: 'Get personalized recipe suggestions based on your taste',
        component: 'AIRecommendation'
    },
    {
        title: 'Track Your Nutrition',
        description: 'Monitor calories, macros, and health goals effortlessly',
        component: 'NutritionDashboard'
    }
];

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []); // Empty dependency array - carousel runs independently

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            if (email && password) {
                onLogin({ email, name: email.split('@')[0] });
            } else {
                setError('Please enter valid credentials');
            }
            setLoading(false);
        }, 1500);
    };

    const handleGoogleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            onLogin({ email: 'user@gmail.com', name: 'Google User' });
            setLoading(false);
        }, 1500);
    };

    // Mini UI Components for Carousel
    const RecipeGrid = () => (
        <div className="w-full max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl shadow-2xl p-6">
            <div className="grid grid-cols-2 gap-4">
                {[
                    { name: 'Butter Chicken', state: 'Punjab', cal: 450, img: '🍗' },
                    { name: 'Masala Dosa', state: 'Karnataka', cal: 320, img: '🥞' },
                    { name: 'Biryani', state: 'Hyderabad', cal: 550, img: '🍛' },
                    { name: 'Dhokla', state: 'Gujarat', cal: 180, img: '🧈' }
                ].map((recipe, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-gradient-to-br from-rose-500/20 to-rose-600/20 border border-rose-500/30 rounded-2xl p-4 hover:shadow-lg hover:shadow-rose-500/20 transition-all"
                    >
                        <div className="text-5xl mb-2">{recipe.img}</div>
                        <h4 className="font-bold text-white text-sm mb-1">{recipe.name}</h4>
                        <p className="text-xs text-slate-400 mb-2">{recipe.state}</p>
                        <div className="flex items-center gap-1 text-xs">
                            <span className="bg-rose-500 text-white px-2 py-1 rounded-full font-semibold">
                                {recipe.cal} cal
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );

    const AIRecommendation = () => (
        <div className="w-full max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl">🤖</span>
                </div>
                <h3 className="font-bold text-white mb-2">AI Taste Analysis</h3>
                <p className="text-sm text-gray-400">Based on your preferences</p>
            </div>

            <div className="space-y-3">
                {[
                    { label: 'Spice Level', value: 75, color: 'bg-red-400' },
                    { label: 'Sweet Preference', value: 45, color: 'bg-pink-400' },
                    { label: 'Protein Focus', value: 90, color: 'bg-emerald-400' }
                ].map((pref, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-300 font-medium">{pref.label}</span>
                            <span className="text-gray-400">{pref.value}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pref.value}%` }}
                                transition={{ delay: i * 0.2, duration: 0.8 }}
                                className={`${pref.color} h-2 rounded-full`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 bg-rose-500/20 border border-rose-500/30 rounded-xl p-4">
                <p className="text-sm text-gray-300">
                    <span className="font-semibold text-rose-400">Top Match:</span> Spicy Chettinad Chicken
                </p>
            </div>
        </div>
    );

    const NutritionDashboard = () => (
        <div className="w-full max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl shadow-2xl p-6">
            <div className="mb-6">
                <h3 className="font-bold text-white mb-1">Today's Progress</h3>
                <p className="text-sm text-gray-400">Keep up the great work!</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                    { label: 'Calories', value: '1,850', target: '2,000', color: 'from-cyan-400 to-blue-500' },
                    { label: 'Protein', value: '85g', target: '100g', color: 'from-green-400 to-emerald-500' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.15 }}
                        className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 text-white`}
                    >
                        <p className="text-xs opacity-90 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold mb-1">{stat.value}</p>
                        <p className="text-xs opacity-75">of {stat.target}</p>
                    </motion.div>
                ))}
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center text-xl">
                            🍛
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 text-sm">Lunch</p>
                            <p className="text-xs text-gray-500">Paneer Tikka Bowl</p>
                        </div>
                    </div>
                    <span className="text-sm font-bold text-gray-700">450 cal</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-xl">
                            🥗
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800 text-sm">Dinner</p>
                            <p className="text-xs text-gray-500">Dal Tadka & Roti</p>
                        </div>
                    </div>
                    <span className="text-sm font-bold text-gray-700">380 cal</span>
                </div>
            </div>
        </div>
    );

    const renderSlideComponent = (componentName) => {
        switch (componentName) {
            case 'RecipeGrid':
                return <RecipeGrid />;
            case 'AIRecommendation':
                return <AIRecommendation />;
            case 'NutritionDashboard':
                return <NutritionDashboard />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Feature Showcase */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
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
                                {renderSlideComponent(CAROUSEL_SLIDES[currentSlide].component)}
                            </div>

                            {/* Title & Description */}
                            <h2 className="text-3xl font-display font-bold mb-4 bg-gradient-to-r from-rose-500 to-rose-600 bg-clip-text text-transparent">
                                {CAROUSEL_SLIDES[currentSlide].title}
                            </h2>
                            <p className="text-gray-600 text-lg max-w-md mx-auto">
                                {CAROUSEL_SLIDES[currentSlide].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Carousel Dots */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {CAROUSEL_SLIDES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-rose-600 w-8' : 'bg-gray-600'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-900 to-slate-800">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Logo & Title */}
                    <div className="mb-10">
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
                            FlavourFit
                        </h1>
                        <p className="text-gray-300 text-lg">Welcome to FlavourFit</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                User's name or Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-600 bg-slate-700/50 focus:border-rose-500 focus:outline-none transition-colors text-white placeholder-gray-400"
                                    placeholder="David Brooks"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-slate-600 bg-slate-700/50 focus:border-rose-500 focus:outline-none transition-colors text-white placeholder-gray-400"
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

                        {/* Forgot Password */}
                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-gray-500 hover:text-rose-500 transition-colors"
                            >
                                Forget password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-rose-500 to-rose-600 hover:shadow-lg hover:shadow-rose-500/50 text-white font-semibold rounded-xl transition-all duration-300"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing in...
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </motion.button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-500">or</span>
                            </div>
                        </div>

                        {/* Google Login */}
                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="w-full py-4 bg-slate-700/50 border-2 border-slate-600 hover:border-slate-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-3"
                        >
                            <Chrome className="w-5 h-5" />
                            Sign in with Google
                        </motion.button>

                        {/* Sign Up Link */}
                        <p className="text-center text-gray-400 text-sm mt-6">
                            New Lovebirds?{' '}
                            <Link
                                to="/signup"
                                className="text-rose-500 hover:text-rose-400 font-semibold transition-colors"
                            >
                                Create Account
                            </Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
