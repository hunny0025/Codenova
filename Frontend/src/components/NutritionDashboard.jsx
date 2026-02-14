import React from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, Calendar, Target } from 'lucide-react';
import { PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';

const NutritionDashboard = ({ userStats }) => {
    const {
        dailyCalories = 1850,
        calorieGoal = 2000,
        streak = 7,
        weeklyData = [
            { day: 'Mon', calories: 1900 },
            { day: 'Tue', calories: 1850 },
            { day: 'Wed', calories: 2100 },
            { day: 'Thu', calories: 1950 },
            { day: 'Fri', calories: 1800 },
            { day: 'Sat', calories: 2050 },
            { day: 'Sun', calories: 1850 },
        ],
        flavorProfile = {
            spicy: 7,
            sweet: 4,
            tangy: 6,
            savory: 8,
            bitter: 3
        }
    } = userStats || {};

    const caloriePercentage = (dailyCalories / calorieGoal) * 100;
    const circumference = 2 * Math.PI * 70;
    const strokeDashoffset = circumference - (circumference * caloriePercentage) / 100;

    const macroData = [
        { name: 'Protein', value: 65, color: '#F59E0B' },
        { name: 'Carbs', value: 180, color: '#FBBF24' },
        { name: 'Fat', value: 55, color: '#FCD34D' },
    ];

    const radarData = Object.entries(flavorProfile).map(([key, value]) => ({
        taste: key.charAt(0).toUpperCase() + key.slice(1),
        value: value
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-tandoor-900 to-tandoor-800 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl font-bold text-saffron-400 mb-4">
                        Your Nutrition Dashboard
                    </h2>
                    <p className="text-xl text-gray-300">
                        Track your progress and taste preferences
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Calorie Progress Ring */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="glass rounded-3xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Flame className="w-6 h-6 text-saffron-400" />
                            Daily Calories
                        </h3>

                        <div className="relative flex items-center justify-center mb-6">
                            <svg className="transform -rotate-90" width="200" height="200">
                                {/* Background circle */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="70"
                                    stroke="rgba(251, 191, 36, 0.2)"
                                    strokeWidth="12"
                                    fill="none"
                                />
                                {/* Progress circle */}
                                <motion.circle
                                    cx="100"
                                    cy="100"
                                    r="70"
                                    stroke="url(#gradient)"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#FBBF24" />
                                        <stop offset="100%" stopColor="#F59E0B" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <div className="text-4xl font-bold text-white">{dailyCalories}</div>
                                <div className="text-sm text-gray-400">of {calorieGoal}</div>
                                <div className="text-xs text-saffron-400 mt-1">{Math.round(caloriePercentage)}%</div>
                            </div>
                        </div>

                        {/* Macro breakdown */}
                        <div className="space-y-3">
                            {macroData.map((macro) => (
                                <div key={macro.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: macro.color }}
                                        />
                                        <span className="text-gray-300">{macro.name}</span>
                                    </div>
                                    <span className="text-white font-bold">{macro.value}g</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Streak Counter */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glass rounded-3xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-saffron-400" />
                            Streak & Goals
                        </h3>

                        {/* Streak display */}
                        <div className="text-center mb-8">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-7xl mb-2"
                            >
                                🔥
                            </motion.div>
                            <div className="text-5xl font-bold text-saffron-400 mb-2">{streak} days</div>
                            <div className="text-gray-300">Current Streak</div>
                        </div>

                        {/* Weekly heatmap */}
                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-gray-400 mb-3">This Week</h4>
                            <div className="grid grid-cols-7 gap-2">
                                {weeklyData.map((day, i) => {
                                    const intensity = day.calories / calorieGoal;
                                    const bgColor = intensity >= 0.9 && intensity <= 1.1
                                        ? 'bg-saffron-500'
                                        : intensity > 1.1
                                            ? 'bg-red-500'
                                            : 'bg-saffron-700';

                                    return (
                                        <div key={day.day} className="text-center">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className={`${bgColor} h-12 rounded-lg mb-1 flex items-center justify-center`}
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <span className="text-xs font-bold text-white">
                                                    {day.calories}
                                                </span>
                                            </motion.div>
                                            <div className="text-xs text-gray-400">{day.day}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Goals */}
                        <div className="glass p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-saffron-400" />
                                    <span className="text-sm text-gray-300">Weekly Goal</span>
                                </div>
                                <span className="text-saffron-400 font-bold">5/7 days</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <motion.div
                                    className="bg-saffron-gradient h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: '71%' }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Flavor Radar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="glass rounded-3xl p-8"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-saffron-400" />
                            Flavor Profile
                        </h3>

                        <div className="mb-4">
                            <ResponsiveContainer width="100%" height={250}>
                                <RadarChart data={radarData}>
                                    <PolarGrid stroke="rgba(251, 191, 36, 0.3)" />
                                    <PolarAngleAxis
                                        dataKey="taste"
                                        tick={{ fill: '#FEF3C7', fontSize: 12 }}
                                    />
                                    <Radar
                                        name="Preference"
                                        dataKey="value"
                                        stroke="#F59E0B"
                                        fill="#FBBF24"
                                        fillOpacity={0.6}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-400 mb-3">Your Taste DNA</h4>
                            {radarData.map((item) => (
                                <div key={item.taste} className="flex items-center justify-between">
                                    <span className="text-gray-300">{item.taste}</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-saffron-gradient h-2 rounded-full"
                                                style={{ width: `${(item.value / 10) * 100}%` }}
                                            />
                                        </div>
                                        <span className="text-white font-bold w-8 text-right">{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 glass p-4 rounded-xl">
                            <p className="text-sm text-gray-300">
                                <span className="text-saffron-400 font-semibold">AI Insight:</span> You love savory and spicy flavors!
                                Try our Chole Bhature or Bisi Bele Bath.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Macro pie chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass rounded-3xl p-8 mt-8"
                >
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                        Macronutrient Distribution
                    </h3>
                    <div className="flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={macroData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {macroData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-8 mt-4">
                        {macroData.map((macro) => (
                            <div key={macro.name} className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: macro.color }}
                                />
                                <span className="text-gray-300">{macro.name}: {macro.value}g</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NutritionDashboard;
