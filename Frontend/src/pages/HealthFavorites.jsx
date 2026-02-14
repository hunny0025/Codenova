import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Heart, Plus, X, TrendingUp, TrendingDown, Activity } from 'lucide-react';

const HealthFavorites = () => {
    const [favorites, setFavorites] = useState([
        {
            id: 1,
            name: 'Paneer Tikka',
            image: '🥟',
            tags: ['❤️ Veg', '💪 High Protein', '🌶️ Spicy'],
            calories: 320,
            protein: 28,
            reason: 'Saved because you prefer spicy, high-protein meals'
        },
        {
            id: 2,
            name: 'Dal Makhani',
            image: '🍛',
            tags: ['❤️ Veg', '💪 High Protein', '💰 Budget'],
            calories: 280,
            protein: 18,
            reason: 'Matches your vegetarian and budget preferences'
        },
        {
            id: 3,
            name: 'Palak Paneer',
            image: '🥬',
            tags: ['❤️ Veg', '🌿 Healthy', '💪 High Protein'],
            calories: 250,
            protein: 22,
            reason: 'Low-calorie, high-protein option for weight loss'
        },
        {
            id: 4,
            name: 'Grilled Chicken Salad',
            image: '🥗',
            tags: ['🍗 Non-Veg', '💪 High Protein', '🌿 Low Cal'],
            calories: 220,
            protein: 35,
            reason: 'Perfect for your high-protein, low-calorie goals'
        },
        {
            id: 5,
            name: 'Moong Dal Chilla',
            image: '🥙',
            tags: ['❤️ Veg', '🥄 15min', '💰 Budget'],
            calories: 180,
            protein: 12,
            reason: 'Quick, budget-friendly breakfast option'
        },
        {
            id: 6,
            name: 'Tandoori Roti with Sabzi',
            image: '🫓',
            tags: ['❤️ Veg', '🌾 High Fiber', '🌿 Healthy'],
            calories: 240,
            protein: 8,
            reason: 'Healthy, fiber-rich meal for better digestion'
        }
    ]);

    const [hoveredCard, setHoveredCard] = useState(null);

    // Health profile data
    const healthProfile = {
        goal: 'Weight Loss',
        goalIcon: '🎯',
        diet: 'Vegetarian',
        dietIcon: '❤️',
        conditions: ['Diabetes', 'Heart-friendly'],
        conditionIcon: '🏥',
        dailyCalories: 1800,
        dailyProtein: 80
    };

    // Health trends data (last 7 days)
    const caloriesTrend = [1650, 1720, 1800, 1750, 1820, 1780, 1790];
    const proteinTrend = [72, 78, 82, 75, 85, 80, 83];
    const healthScore = 87;

    const removeFavorite = (id) => {
        setFavorites(favorites.filter(fav => fav.id !== id));
    };

    const addToMealPlan = (dish) => {
        alert(`Adding "${dish.name}" to your meal plan...`);
    };

    return (
        <div className="min-h-screen p-8" style={{ background: '#0D1117' }}>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-display font-bold flex items-center gap-3 mb-2" style={{ color: '#F8FAFC' }}>
                    ❤️ Health & Favorites
                </h1>
                <p style={{ color: '#A1A1AA' }}>Your health profile and saved meal preferences</p>
            </div>

            {/* Main 2-Column Layout */}
            <div className="grid grid-cols-[400px_1fr] gap-8 mb-8">
                {/* Left: Health Profile & Goals */}
                <div className="space-y-6">
                    {/* Health Profile Card */}
                    <div className="rounded-3xl p-6 backdrop-blur-sm border" style={{
                        background: 'rgba(22, 27, 34, 0.6)',
                        borderColor: 'rgba(139, 92, 246, 0.2)',
                        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)'
                    }}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold" style={{ color: '#F8FAFC' }}>Health Profile</h2>
                            <button className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                <Edit2 className="w-5 h-5" style={{ color: '#A1A1AA' }} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Primary Goal */}
                            <div className="flex items-center justify-between p-4 rounded-2xl border" style={{
                                background: 'rgba(225, 29, 72, 0.1)',
                                borderColor: 'rgba(225, 29, 72, 0.3)'
                            }}>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{healthProfile.goalIcon}</span>
                                    <div>
                                        <p className="text-sm" style={{ color: '#A1A1AA' }}>Primary Goal</p>
                                        <p className="font-bold" style={{ color: '#F8FAFC' }}>{healthProfile.goal}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Diet Type */}
                            <div className="flex items-center justify-between p-4 rounded-2xl border" style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                borderColor: 'rgba(16, 185, 129, 0.3)'
                            }}>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{healthProfile.dietIcon}</span>
                                    <div>
                                        <p className="text-sm" style={{ color: '#A1A1AA' }}>Diet Type</p>
                                        <p className="font-bold" style={{ color: '#F8FAFC' }}>{healthProfile.diet}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Medical Conditions */}
                            <div className="p-4 rounded-2xl border" style={{
                                background: 'rgba(124, 58, 237, 0.1)',
                                borderColor: 'rgba(124, 58, 237, 0.3)'
                            }}>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">{healthProfile.conditionIcon}</span>
                                    <div>
                                        <p className="text-sm" style={{ color: '#A1A1AA' }}>Medical Conditions</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {healthProfile.conditions.map((condition, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full text-sm font-semibold"
                                            style={{
                                                background: '#7C3AED',
                                                color: '#E0E7FF'
                                            }}
                                        >
                                            {condition}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Daily Targets */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-4 rounded-2xl border" style={{
                                    background: 'rgba(124, 58, 237, 0.1)',
                                    borderColor: 'rgba(124, 58, 237, 0.3)'
                                }}>
                                    <p className="text-sm mb-1" style={{ color: '#A1A1AA' }}>Daily Calories</p>
                                    <p className="text-2xl font-bold" style={{ color: '#A78BFA' }}>{healthProfile.dailyCalories}</p>
                                    <p className="text-xs" style={{ color: '#71717A' }}>kcal target</p>
                                </div>
                                <div className="p-4 rounded-2xl border" style={{
                                    background: 'rgba(225, 29, 72, 0.1)',
                                    borderColor: 'rgba(225, 29, 72, 0.3)'
                                }}>
                                    <p className="text-sm mb-1" style={{ color: '#A1A1AA' }}>Daily Protein</p>
                                    <p className="text-2xl font-bold" style={{ color: '#F43F5E' }}>{healthProfile.dailyProtein}g</p>
                                    <p className="text-xs" style={{ color: '#71717A' }}>protein goal</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Note */}
                        <div className="mt-6 p-4 rounded-2xl border" style={{
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderColor: 'rgba(16, 185, 129, 0.3)'
                        }}>
                            <div className="flex items-start gap-3">
                                <span className="text-2xl">🤖</span>
                                <div>
                                    <p className="text-sm font-semibold mb-1" style={{ color: '#F8FAFC' }}>AI Health Guardian</p>
                                    <p className="text-sm" style={{ color: '#A1A1AA' }}>
                                        AI recommendations automatically avoid high-sugar and high-fat meals based on your diabetes and heart-friendly profile.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Favorites Grid */}
                <div className="rounded-3xl p-6 backdrop-blur-sm border" style={{
                    background: 'rgba(22, 27, 34, 0.6)',
                    borderColor: 'rgba(139, 92, 246, 0.2)',
                    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)'
                }}>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold" style={{ color: '#F8FAFC' }}>Your Favorites</h2>
                            <p className="text-sm" style={{ color: '#A1A1AA' }}>Saved meals that match your taste and health goals</p>
                        </div>
                        <span className="px-4 py-2 rounded-full font-bold" style={{
                            background: 'rgba(225, 29, 72, 0.2)',
                            color: '#F43F5E',
                            border: '1px solid rgba(225, 29, 72, 0.3)'
                        }}>
                            {favorites.length} saved
                        </span>
                    </div>

                    {/* Favorites Grid */}
                    <div className="grid grid-cols-3 gap-6">
                        {favorites.map((dish, index) => (
                            <motion.div
                                key={dish.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border"
                                style={{
                                    background: 'rgba(22, 27, 34, 0.4)',
                                    borderColor: 'rgba(139, 92, 246, 0.15)'
                                }}
                                onMouseEnter={() => setHoveredCard(dish.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Dish Image */}
                                <div className="h-32 flex items-center justify-center relative" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                                    <span className="text-6xl">{dish.image}</span>

                                    {/* Hover Tooltip */}
                                    <AnimatePresence>
                                        {hoveredCard === dish.id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3"
                                            >
                                                <p className="text-white text-xs text-center font-medium">{dish.reason}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Dish Info */}
                                <div className="p-4">
                                    <h3 className="font-bold mb-2" style={{ color: '#F8FAFC' }}>{dish.name}</h3>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {dish.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="text-xs px-2 py-1 rounded-full font-medium"
                                                style={{
                                                    background: '#7C3AED',
                                                    color: '#E0E7FF'
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Nutrition */}
                                    <div className="flex justify-between text-xs mb-3" style={{ color: '#A1A1AA' }}>
                                        <span>{dish.calories} cal</span>
                                        <span>{dish.protein}g protein</span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => addToMealPlan(dish)}
                                            className="flex-1 py-2 rounded-xl font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-1"
                                            style={{
                                                background: 'linear-gradient(135deg, #E11D48, #BE123C)',
                                                color: '#FFFFFF'
                                            }}
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add
                                        </button>
                                        <button
                                            onClick={() => removeFavorite(dish.id)}
                                            className="px-3 py-2 rounded-xl transition-colors"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.05)',
                                            }}
                                        >
                                            <X className="w-4 h-4 hover:text-red-400" style={{ color: '#A1A1AA' }} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom: Health Insights Panel */}
            <div className="rounded-3xl p-6 backdrop-blur-sm border" style={{
                background: 'rgba(22, 27, 34, 0.6)',
                borderColor: 'rgba(139, 92, 246, 0.2)',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)'
            }}>
                <h2 className="text-2xl font-bold mb-6" style={{ color: '#F8FAFC' }}>Health Insights</h2>

                <div className="grid grid-cols-[1fr_1fr_300px] gap-6">
                    {/* Calories Trend */}
                    <div className="p-5 rounded-2xl border" style={{
                        background: 'rgba(124, 58, 237, 0.1)',
                        borderColor: 'rgba(124, 58, 237, 0.3)'
                    }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold" style={{ color: '#F8FAFC' }}>Calories Trend</h3>
                            <TrendingDown className="w-5 h-5" style={{ color: '#10B981' }} />
                        </div>

                        {/* Simple bar chart */}
                        <div className="flex items-end justify-between gap-2 h-32">
                            {caloriesTrend.map((cal, index) => {
                                const height = (cal / 2000) * 100;
                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                                        <div className="w-full rounded-t-lg" style={{ height: `${height}%`, background: '#A78BFA' }}></div>
                                        <span className="text-xs" style={{ color: '#A1A1AA' }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4 text-sm" style={{ color: '#A1A1AA' }}>
                            <span className="font-semibold" style={{ color: '#F8FAFC' }}>Avg: {Math.round(caloriesTrend.reduce((a, b) => a + b) / 7)} kcal/day</span>
                            <span className="ml-2" style={{ color: '#10B981' }}>↓ 5% from last week</span>
                        </div>
                    </div>

                    {/* Protein Trend */}
                    <div className="p-5 rounded-2xl border" style={{
                        background: 'rgba(225, 29, 72, 0.1)',
                        borderColor: 'rgba(225, 29, 72, 0.3)'
                    }}>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold" style={{ color: '#F8FAFC' }}>Protein Intake</h3>
                            <TrendingUp className="w-5 h-5" style={{ color: '#F43F5E' }} />
                        </div>

                        {/* Simple bar chart */}
                        <div className="flex items-end justify-between gap-2 h-32">
                            {proteinTrend.map((protein, index) => {
                                const height = (protein / 100) * 100;
                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-1">
                                        <div className="w-full rounded-t-lg" style={{ height: `${height}%`, background: '#F43F5E' }}></div>
                                        <span className="text-xs" style={{ color: '#A1A1AA' }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-4 text-sm" style={{ color: '#A1A1AA' }}>
                            <span className="font-semibold" style={{ color: '#F8FAFC' }}>Avg: {Math.round(proteinTrend.reduce((a, b) => a + b) / 7)}g/day</span>
                            <span className="ml-2" style={{ color: '#F43F5E' }}>↑ 8% from last week</span>
                        </div>
                    </div>

                    {/* Health Score */}
                    <div className="p-5 rounded-2xl border flex flex-col items-center justify-center" style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderColor: 'rgba(16, 185, 129, 0.3)'
                    }}>
                        <Activity className="w-12 h-12 mb-3" style={{ color: '#10B981' }} />
                        <h3 className="font-bold mb-2" style={{ color: '#F8FAFC' }}>Health Score</h3>
                        <div className="text-6xl font-bold mb-2" style={{ color: '#10B981' }}>{healthScore}</div>
                        <div className="text-2xl" style={{ color: '#71717A' }}>/100</div>
                        <p className="text-sm mt-3 text-center" style={{ color: '#A1A1AA' }}>
                            Excellent! Keep up the good work 🎉
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HealthFavorites;
