import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Target, DollarSign, ShoppingCart, TrendingUp, Lock, Heart, Repeat } from 'lucide-react';

const MealPlanner = () => {
    const [budget, setBudget] = useState(200);
    const [regenerating, setRegenerating] = useState(false);
    const [lockedMeals, setLockedMeals] = useState([]);
    const [likedMeals, setLikedMeals] = useState([]);

    // Optimization sliders
    const [tasteSlider, setTasteSlider] = useState(40);
    const [healthSlider, setHealthSlider] = useState(30);
    const [budgetSlider, setBudgetSlider] = useState(20);
    const [diversitySlider, setDiversitySlider] = useState(10);

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];

    // Sample meal data
    const sampleMeals = {
        Breakfast: [
            { name: 'Masala Dosa', emoji: '🥞', cal: 280, protein: 8, price: 45, tags: ['🌶️ Spicy', '💪 8g', '💰 ₹45', '❤️ Safe'] },
            { name: 'Poha', emoji: '🍚', cal: 250, protein: 6, price: 35, tags: ['🌿 Mild', '💪 6g', '💰 ₹35', '❤️ Safe'] },
            { name: 'Idli Sambar', emoji: '⚪', cal: 220, protein: 7, price: 40, tags: ['🌿 Mild', '💪 7g', '💰 ₹40', '❤️ Safe'] },
            { name: 'Upma', emoji: '🍲', cal: 240, protein: 5, price: 30, tags: ['🌿 Mild', '💪 5g', '💰 ₹30', '❤️ Safe'] },
            { name: 'Paratha', emoji: '🫓', cal: 320, protein: 9, price: 50, tags: ['🌶️ Spicy', '💪 9g', '💰 ₹50', '❤️ Safe'] },
            { name: 'Uttapam', emoji: '🥘', cal: 260, protein: 7, price: 45, tags: ['🌿 Mild', '💪 7g', '💰 ₹45', '❤️ Safe'] },
            { name: 'Aloo Paratha', emoji: '🥔', cal: 340, protein: 8, price: 55, tags: ['🌶️ Spicy', '💪 8g', '💰 ₹55', '❤️ Safe'] },
        ],
        Lunch: [
            { name: 'Palak Paneer', emoji: '🍛', cal: 320, protein: 28, price: 85, tags: ['🌶️ Spicy', '💪 28g', '💰 ₹85', '❤️ Safe'] },
            { name: 'Dal Tadka', emoji: '🥘', cal: 280, protein: 18, price: 65, tags: ['🌿 Mild', '💪 18g', '💰 ₹65', '❤️ Safe'] },
            { name: 'Chole Bhature', emoji: '🫘', cal: 450, protein: 15, price: 75, tags: ['🌶️ Spicy', '💪 15g', '💰 ₹75', '❤️ Safe'] },
            { name: 'Rajma Chawal', emoji: '🍚', cal: 380, protein: 20, price: 70, tags: ['🌿 Mild', '💪 20g', '💰 ₹70', '❤️ Safe'] },
            { name: 'Veg Biryani', emoji: '🍛', cal: 420, protein: 12, price: 90, tags: ['🌶️ Spicy', '💪 12g', '💰 ₹90', '❤️ Safe'] },
            { name: 'Paneer Tikka', emoji: '🧈', cal: 340, protein: 25, price: 95, tags: ['🌶️ Spicy', '💪 25g', '💰 ₹95', '❤️ Safe'] },
            { name: 'Sambar Rice', emoji: '🍲', cal: 300, protein: 14, price: 60, tags: ['🌿 Mild', '💪 14g', '💰 ₹60', '❤️ Safe'] },
        ],
        Dinner: [
            { name: 'Roti Sabzi', emoji: '🫓', cal: 280, protein: 12, price: 55, tags: ['🌿 Mild', '💪 12g', '💰 ₹55', '❤️ Safe'] },
            { name: 'Khichdi', emoji: '🍚', cal: 240, protein: 10, price: 45, tags: ['🌿 Mild', '💪 10g', '💰 ₹45', '❤️ Safe'] },
            { name: 'Dosa Chutney', emoji: '🥞', cal: 260, protein: 8, price: 50, tags: ['🌶️ Spicy', '💪 8g', '💰 ₹50', '❤️ Safe'] },
            { name: 'Veg Pulao', emoji: '🍛', cal: 320, protein: 11, price: 65, tags: ['🌿 Mild', '💪 11g', '💰 ₹65', '❤️ Safe'] },
            { name: 'Paneer Curry', emoji: '🧈', cal: 340, protein: 24, price: 80, tags: ['🌶️ Spicy', '💪 24g', '💰 ₹80', '❤️ Safe'] },
            { name: 'Mixed Dal', emoji: '🥘', cal: 270, protein: 16, price: 60, tags: ['🌿 Mild', '💪 16g', '💰 ₹60', '❤️ Safe'] },
            { name: 'Veg Korma', emoji: '🍲', cal: 310, protein: 13, price: 75, tags: ['🌶️ Spicy', '💪 13g', '💰 ₹75', '❤️ Safe'] },
        ],
    };

    const handleRegenerate = () => {
        setRegenerating(true);
        setTimeout(() => setRegenerating(false), 2000);
    };

    const toggleLock = (mealId) => {
        setLockedMeals(prev =>
            prev.includes(mealId) ? prev.filter(id => id !== mealId) : [...prev, mealId]
        );
    };

    const toggleLike = (mealId) => {
        setLikedMeals(prev =>
            prev.includes(mealId) ? prev.filter(id => id !== mealId) : [...prev, mealId]
        );
    };

    const MealCard = ({ meal, mealId, dayIndex, mealType }) => {
        const isLocked = lockedMeals.includes(mealId);
        const isLiked = likedMeals.includes(mealId);

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-3 shadow-md hover:shadow-xl hover:shadow-violet-500/20 transition-all ${isLocked ? 'ring-2 ring-yellow-400' : ''
                    }`}
            >
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl">{meal.emoji}</span>
                    <div className="flex-1">
                        <h4 className="font-bold text-sm text-white leading-tight">{meal.name}</h4>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-2">
                    {meal.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-[10px] bg-slate-700 px-1.5 py-0.5 rounded-full text-gray-300">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="text-xs text-gray-400 mb-3">
                    {meal.cal} cal • {meal.protein}g protein
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={() => toggleLock(mealId)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${isLocked
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {isLocked ? '🔒' : '➕'}
                    </button>
                    <button
                        onClick={() => toggleLike(mealId)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${isLiked
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        ❤️
                    </button>
                    <button className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-600 transition-colors">
                        🔁
                    </button>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-display font-bold text-white flex items-center gap-3">
                        📅 Weekly Meal Planner
                    </h1>
                    <p className="text-gray-300 mt-1">AI-optimized for taste, health & budget</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRegenerate}
                        disabled={regenerating}
                        className="px-6 py-3 bg-gradient-to-r from-rose-500 to-violet-600 text-white rounded-2xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-rose-500/50 transition-all disabled:opacity-50"
                    >
                        <RefreshCw className={`w-5 h-5 ${regenerating ? 'animate-spin' : ''}`} />
                        {regenerating ? 'AI Optimizing...' : 'Regenerate Week'}
                    </button>
                    <button className="px-6 py-3 bg-slate-700/50 border-2 border-slate-600 text-white rounded-2xl font-semibold flex items-center gap-2 hover:border-slate-500 transition-all">
                        <Target className="w-5 h-5" />
                        Change Goal
                    </button>
                    <div className="px-6 py-3 bg-green-500/20 border-2 border-green-500/30 text-green-400 rounded-2xl font-semibold flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Budget: ₹{budget}/day
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-[1fr_400px] gap-6">
                {/* Left: Meal Grid */}
                <div className="space-y-6">
                    {/* Days Header */}
                    <div className="grid grid-cols-7 gap-3">
                        {days.map((day) => (
                            <div key={day} className="text-center font-bold text-white text-lg">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Meal Rows */}
                    {mealTypes.map((mealType, typeIndex) => (
                        <div key={mealType}>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-2xl">
                                    {mealType === 'Breakfast' ? '🍳' : mealType === 'Lunch' ? '🍛' : '🌙'}
                                </span>
                                <h3 className="font-bold text-white text-lg">{mealType}</h3>
                            </div>

                            <div className="grid grid-cols-7 gap-3">
                                {days.map((day, dayIndex) => {
                                    const meal = sampleMeals[mealType][dayIndex];
                                    const mealId = `${mealType}-${dayIndex}`;
                                    return (
                                        <MealCard
                                            key={mealId}
                                            meal={meal}
                                            mealId={mealId}
                                            dayIndex={dayIndex}
                                            mealType={mealType}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Bottom Row: Grocery & Summary */}
                    <div className="grid grid-cols-2 gap-6 mt-8">
                        {/* Grocery Preview */}
                        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-6 shadow-xl">
                            <h3 className="font-bold text-white text-xl mb-4 flex items-center gap-2">
                                <ShoppingCart className="w-6 h-6 text-violet-400" />
                                This Week's Grocery List
                            </h3>

                            <div className="space-y-2 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">• Onion</span>
                                    <span className="text-gray-400">1kg</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">• Paneer</span>
                                    <span className="text-gray-400">250g</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">• Rice</span>
                                    <span className="text-gray-400">2kg</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-300">• Spices</span>
                                    <span className="text-gray-400">₹80</span>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors mb-2">
                                🧾 View Full List
                            </button>

                            <div className="text-center text-lg font-bold text-white">
                                💰 Estimated: ₹1,350
                            </div>
                        </div>

                        {/* Weekly Summary */}
                        <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl p-6 shadow-xl text-white">
                            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6" />
                                Weekly Impact Summary
                            </h3>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Avg Calories:</span>
                                    <span className="font-bold">1,950/day</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Avg Protein:</span>
                                    <span className="font-bold">110g/day</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Budget Saved:</span>
                                    <span className="font-bold">₹280/week</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Health Score:</span>
                                    <span className="font-bold text-2xl">87% ✅</span>
                                </div>
                                <div className="flex justify-between items-center pt-3 border-t border-white/20">
                                    <span>Streak:</span>
                                    <span className="font-bold text-2xl">7 days 🔥</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: AI Controls */}
                <div className="space-y-6">
                    {/* Optimization Sliders */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-6 shadow-xl">
                        <h3 className="font-bold text-white text-xl mb-6">🤖 AI Optimization</h3>

                        <div className="space-y-5">
                            {/* Taste Priority */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-700">Taste Priority</span>
                                    <span className="text-sm font-bold text-rose-600">{tasteSlider}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={tasteSlider}
                                    onChange={(e) => setTasteSlider(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                                />
                            </div>

                            {/* Health Priority */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-700">Health Priority</span>
                                    <span className="text-sm font-bold text-emerald-600">{healthSlider}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={healthSlider}
                                    onChange={(e) => setHealthSlider(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                            </div>

                            {/* Budget Priority */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-700">Budget Priority</span>
                                    <span className="text-sm font-bold text-violet-600">{budgetSlider}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={budgetSlider}
                                    onChange={(e) => setBudgetSlider(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
                                />
                            </div>

                            {/* Diversity */}
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-700">Diversity</span>
                                    <span className="text-sm font-bold text-fuchsia-600">{diversitySlider}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={diversitySlider}
                                    onChange={(e) => setDiversitySlider(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-fuchsia-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Constraints */}
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-6 shadow-xl">
                        <h3 className="font-bold text-white text-xl mb-4">⚙️ Constraints</h3>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                                <span className="text-sm font-semibold text-gray-700">🥗 Diet</span>
                                <span className="text-sm font-bold text-green-700">Vegetarian ✓</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                                <span className="text-sm font-semibold text-gray-700">❤️ Health</span>
                                <span className="text-sm font-bold text-red-700">Diabetes ✓</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-violet-50 rounded-xl">
                                <span className="text-sm font-semibold text-gray-700">💰 Budget</span>
                                <span className="text-sm font-bold text-violet-700">₹{budget}/day</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-fuchsia-50 rounded-xl">
                                <span className="text-sm font-semibold text-gray-700">🏠 Pantry Mode</span>
                                <span className="text-sm font-bold text-fuchsia-700">ON</span>
                            </div>
                        </div>
                    </div>

                    {/* AI Insights */}
                    <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl p-6 shadow-xl text-white">
                        <h3 className="font-bold text-xl mb-3">💡 AI Insights</h3>
                        <p className="text-sm leading-relaxed">
                            Based on your preferences, we've optimized this week for high protein intake while staying under budget.
                            3 meals are locked from last week.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealPlanner;
