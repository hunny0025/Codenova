import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Home,
    User,
    Calendar,
    ShoppingCart,
    Heart,
    Settings,
    Search,
    Crown,
    MapPin,
    Brain,
    TrendingUp,
    TrendingDown,
    Play,
    ThumbsUp,
    Plus,
    X
} from 'lucide-react';

const Dashboard = ({ user }) => {
    const [streak, setStreak] = useState(7);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen p-8" style={{ background: '#0D1117' }}>
            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-display font-bold text-white">
                            Hi, {user?.name || 'Priya'}! 👋
                        </h1>
                        <p className="text-gray-300 mt-1">Let's optimize your meals today</p>
                    </div>


                    {/* Streak Block - Moved from bottom */}
                    <div className="flex-1 mx-6 hidden md:block">
                        <div className="rounded-2xl p-3 px-6 relative overflow-hidden flex items-center justify-between shadow-lg border" style={{
                            background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                            borderColor: 'rgba(245, 158, 11, 0.3)'
                        }}>
                            <div className="flex items-center gap-3 relative z-10">
                                <span className="text-2xl">🔥</span>
                                <div>
                                    <h3 className="font-bold text-white text-sm leading-tight">Clean Eating Streak</h3>
                                    <p className="text-white/90 text-xs">{streak} days 🔥 Keep going!</p>
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-white relative z-10">{streak}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search recipes, ingredients, goals..."
                                className="pl-12 pr-4 py-3 w-96 rounded-2xl bg-slate-700/50 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 shadow-sm"
                            />
                        </div>

                        {/* Upgrade Button */}
                        <button className="px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all hover:scale-105" style={{
                            background: 'linear-gradient(135deg, #E11D48, #BE123C)',
                            boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)',
                            color: '#FFFFFF'
                        }}>
                            <Crown className="w-5 h-5 text-yellow-300" />
                            Upgrade
                        </button>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-5 gap-6 mb-6">
                    {/* LEFT COLUMN - 40% (2 cols) */}
                    <div className="col-span-2 space-y-6">
                        {/* BIG HERO CARD - 70% */}
                        <div className="rounded-3xl p-8 shadow-xl relative overflow-hidden min-h-[420px]" style={{
                            background: 'linear-gradient(135deg, #161B22, #0D1117)',
                            border: '1px solid rgba(124, 58, 237, 0.3)'
                        }}>
                            <div className="relative z-10">
                                <div className="mb-4">
                                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4">
                                        ✅ AI-Optimized
                                    </span>
                                </div>

                                <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                                    Your AI-Optimized
                                    <br />
                                    Meal Plan Starts Here!
                                </h2>

                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                                        <p className="text-white/80 text-xs mb-1">Goal</p>
                                        <p className="text-white font-bold">Weight Loss</p>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                                        <p className="text-white/80 text-xs mb-1">Taste</p>
                                        <p className="text-white font-bold">🌶️ Spicy</p>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                                        <p className="text-white/80 text-xs mb-1">Budget</p>
                                        <p className="text-white font-bold">₹200/day</p>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
                                        <p className="text-white/80 text-xs mb-1">Health</p>
                                        <p className="text-white font-bold">❤️ Diabetic</p>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all"
                                    style={{
                                        background: 'linear-gradient(135deg, #E11D48, #BE123C)',
                                        color: '#FFFFFF',
                                        boxShadow: '0 8px 20px rgba(225, 29, 72, 0.3)'
                                    }}
                                >
                                    <Play className="w-6 h-6" />
                                    Generate Week's Plan
                                </motion.button>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute right-0 top-0 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: '#E11D48' }}></div>
                            <div className="absolute left-0 bottom-0 w-48 h-48 rounded-full blur-2xl opacity-20" style={{ background: '#7C3AED' }}></div>
                        </div>

                        {/* RECOMMENDATION CARD - 30% */}
                        <div className="backdrop-blur-sm border rounded-3xl p-6 shadow-xl" style={{
                            background: 'rgba(22, 27, 34, 0.6)',
                            borderColor: 'rgba(124, 58, 237, 0.2)'
                        }}>
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl" style={{
                                    background: 'linear-gradient(135deg, #E11D48, #BE123C)'
                                }}>
                                    🍛
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-1">Palak Paneer</h3>
                                    <p className="text-sm font-semibold" style={{ color: '#C026D3' }}>🤖 AI Pick for You</p>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <span className="text-green-400">✓</span>
                                    <span>Matches spicy preference</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <span className="text-green-400">✓</span>
                                    <span>High protein (28g)</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <span className="text-green-400">✓</span>
                                    <span>Under budget (₹85)</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                    <span className="text-green-400">✓</span>
                                    <span>Diabetic safe</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex-1 py-2 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2" style={{
                                    background: 'rgba(225, 29, 72, 0.1)',
                                    color: '#E11D48'
                                }}>
                                    <Heart className="w-4 h-4" />
                                    Like
                                </button>
                                <button className="flex-1 py-2 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-white" style={{
                                    background: 'linear-gradient(135deg, #7C3AED, #6D28D9)'
                                }}>
                                    <Plus className="w-4 h-4" />
                                    Add
                                </button>
                                <button className="py-2 px-4 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* CENTER COLUMN - 20% (1 col) */}
                    <div className="col-span-1">
                        {/* CALORIES PROGRESS CARD */}
                        <div className="backdrop-blur-sm border rounded-3xl p-6 shadow-xl h-full" style={{
                            background: 'rgba(22, 27, 34, 0.6)',
                            borderColor: 'rgba(225, 29, 72, 0.2)'
                        }}>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{
                                    background: 'linear-gradient(135deg, #E11D48, #BE123C)'
                                }}>
                                    🔥
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Nutrition</h3>
                                    <p className="text-xs" style={{ color: '#A1A1AA' }}>Progress</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm text-gray-400">Calories</span>
                                    <span className="text-2xl font-bold text-white">1,850</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-3 mb-1">
                                    <div className="h-3 rounded-full" style={{ width: '92%', background: 'linear-gradient(90deg, #E11D48, #F43F5E)' }}></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>0</span>
                                    <span>2,000 kcal</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm text-gray-400">Protein</span>
                                    <span className="text-2xl font-bold text-white">95g</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-3 mb-1">
                                    <div className="h-3 rounded-full" style={{ width: '79%', background: 'linear-gradient(90deg, #7C3AED, #8B5CF6)' }}></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>0</span>
                                    <span>120g</span>
                                </div>
                            </div>

                            <div className="rounded-xl p-4 text-center border" style={{
                                background: 'rgba(192, 38, 211, 0.1)',
                                borderColor: 'rgba(192, 38, 211, 0.2)'
                            }}>
                                <p className="text-sm text-gray-300">
                                    <span className="font-bold" style={{ color: '#E879F9' }}>AI accuracy today:</span>
                                    <br />
                                    <span className="text-3xl font-bold text-white">86%</span>
                                </p>
                            </div>

                            {/* Macros Breakdown */}
                            <div className="mt-6 grid grid-cols-1 gap-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Carbs</span>
                                    <span className="font-bold text-cyan-400">220g</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Fat</span>
                                    <span className="font-bold text-yellow-400">55g</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - 40% (2 cols) */}
                    <div className="col-span-2 space-y-6">
                        {/* HEALTH INTELLIGENCE GRID - 60% */}
                        <div className="backdrop-blur-sm border rounded-3xl p-6 shadow-xl" style={{
                            background: 'rgba(22, 27, 34, 0.6)',
                            borderColor: 'rgba(124, 58, 237, 0.2)'
                        }}>
                            <h3 className="text-white font-bold text-xl mb-4">Daily Targets</h3>

                            <div className="grid grid-cols-3 gap-3 mb-4">
                                <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-2xl p-4">
                                    <div className="text-3xl mb-2">🔥</div>
                                    <p className="text-2xl font-bold text-white">1,850</p>
                                    <p className="text-xs text-gray-400">of 2,000 cal</p>
                                    <div className="w-full bg-slate-600 rounded-full h-1.5 mt-2">
                                        <div className="bg-gradient-to-r from-cyan-400 to-teal-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-2xl p-4">
                                    <div className="text-3xl mb-2">🥩</div>
                                    <p className="text-2xl font-bold text-white">95g</p>
                                    <p className="text-xs text-gray-400">of 120g protein</p>
                                    <div className="w-full bg-slate-600 rounded-full h-1.5 mt-2">
                                        <div className="bg-gradient-to-r from-violet-500 to-purple-600 h-1.5 rounded-full" style={{ width: '79%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-2xl p-4">
                                    <div className="text-3xl mb-2">🍚</div>
                                    <p className="text-2xl font-bold text-white">220g</p>
                                    <p className="text-xs text-gray-400">of 250g carbs</p>
                                    <div className="w-full bg-slate-600 rounded-full h-1.5 mt-2">
                                        <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-1.5 rounded-full" style={{ width: '88%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-2xl p-4">
                                    <div className="text-3xl mb-2">🥑</div>
                                    <p className="text-2xl font-bold text-white">55g</p>
                                    <p className="text-xs text-gray-400">of 65g fat</p>
                                    <div className="w-full bg-slate-600 rounded-full h-1.5 mt-2">
                                        <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-2xl p-4">
                                    <div className="text-3xl mb-2">💧</div>
                                    <p className="text-2xl font-bold text-white">2.8L</p>
                                    <p className="text-xs text-gray-400">Hydration</p>
                                    <div className="w-full bg-slate-600 rounded-full h-1.5 mt-2">
                                        <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full" style={{ width: '93%' }}></div>
                                    </div>
                                </div>

                                <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-2xl p-4">
                                    <div className="text-3xl mb-2">💰</div>
                                    <p className="text-2xl font-bold text-white">₹165</p>
                                    <p className="text-xs text-gray-400">of ₹200 budget</p>
                                    <div className="w-full bg-slate-600 rounded-full h-1.5 mt-2">
                                        <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full" style={{ width: '82%' }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-sm rounded-xl p-3 text-center">
                                <p className="text-white font-semibold">🎯 All targets on track!</p>
                            </div>
                        </div>

                        {/* TREND GRAPH CARD - 40% */}
                        <div className="backdrop-blur-sm border rounded-3xl p-6 shadow-xl" style={{
                            background: 'rgba(22, 27, 34, 0.6)',
                            borderColor: 'rgba(225, 29, 72, 0.2)'
                        }}>
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-rose-500" />
                                Health Trends
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-xl border" style={{
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    borderColor: 'rgba(16, 185, 129, 0.2)'
                                }}>
                                    <div className="flex items-center gap-3">
                                        <TrendingDown className="w-5 h-5 text-emerald-400" />
                                        <span className="font-semibold text-white">Weight</span>
                                    </div>
                                    <span className="text-emerald-400 font-bold">-2.3 kg</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <TrendingUp className="w-5 h-5 text-blue-400" />
                                        <span className="font-semibold text-white">Protein Avg</span>
                                    </div>
                                    <span className="text-blue-400 font-bold">+12g/day</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <TrendingUp className="w-5 h-5 text-emerald-400" />
                                        <span className="font-semibold text-white">Budget Saved</span>
                                    </div>
                                    <span className="text-emerald-400 font-bold">₹420</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Dashboard;
