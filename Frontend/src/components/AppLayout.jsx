import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AppLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDark, toggleTheme } = useTheme();

    // Check if we're on the dashboard (home)
    const isHome = location.pathname === '/dashboard';

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Persistent Sidebar */}
            <div className="w-20 bg-gradient-to-b from-[#0F172A] to-[#1E293B] flex flex-col items-center py-6 shadow-2xl fixed left-0 top-0 bottom-0 z-50">
                {/* Subtle right curve effect */}
                <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/5 to-transparent rounded-r-2xl"></div>

                {/* Logo */}
                <div className="mb-8 group relative">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-110 overflow-hidden">
                        <img
                            src="/capybara-chef.jpeg"
                            alt="FlavourFit Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                        FlavourFit
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900"></div>
                    </div>
                </div>

                {/* Navigation Icons */}
                <nav className="flex-1 flex flex-col items-center space-y-5 px-3">
                    {/* 1. Home - Dashboard */}
                    <button
                        onClick={() => navigate('/dashboard')}
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 group ${location.pathname === '/dashboard'
                            ? 'bg-gradient-to-r from-rose-500/10 to-rose-600/10 border-l-2 border-rose-500 shadow-lg shadow-rose-500/20'
                            : 'hover:bg-white/5'
                            }`}
                    >
                        <span
                            className="text-2xl"
                            style={location.pathname === '/dashboard' ? { filter: 'drop-shadow(0 0 8px rgba(225, 29, 72, 0.6))' } : {}}
                        >
                            🏠
                        </span>
                        {/* Tooltip */}
                        <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            Dashboard Home
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900"></div>
                        </div>
                    </button>

                    {/* 2. Calendar - Meal Planner */}
                    <button
                        onClick={() => navigate('/planner')}
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/5 group ${location.pathname === '/planner' ? 'bg-white/20' : ''
                            }`}
                    >
                        <span className="text-2xl opacity-60 group-hover:opacity-100">📅</span>
                        {/* Tooltip */}
                        <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            Weekly Meal Planner
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900"></div>
                        </div>
                    </button>

                    {/* 3. Brain - AI Coach */}
                    <button
                        onClick={() => navigate('/coach')}
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/5 group ${location.pathname === '/coach' ? 'bg-white/20' : ''
                            }`}
                    >
                        <span className="text-2xl opacity-60 group-hover:opacity-100">🧠</span>
                        {/* Tooltip */}
                        <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            AI Nutrition Coach
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900"></div>
                        </div>
                    </button>

                    {/* 4. Location - Regional Discovery */}
                    <button
                        onClick={() => navigate('/discover')}
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/5 group ${location.pathname === '/discover' ? 'bg-white/20' : ''
                            }`}
                    >
                        <span className="text-2xl opacity-60 group-hover:opacity-100">📍</span>
                        {/* Tooltip */}
                        <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            Explore India's Flavors
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900"></div>
                        </div>
                    </button>

                    {/* 5. Shopping Cart */}
                    <button
                        onClick={() => navigate('/grocery')}
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/5 group ${location.pathname === '/grocery' ? 'bg-white/20' : ''
                            }`}
                    >
                        <span className="text-2xl opacity-60 group-hover:opacity-100">🛒</span>
                        {/* Tooltip */}
                        <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            Smart Grocery List
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900"></div>
                        </div>
                    </button>

                    {/* 6. Heart - Health & Favorites */}
                    <button
                        onClick={() => navigate('/health')}
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/5 group ${location.pathname === '/health' ? 'bg-white/20' : ''
                            }`}
                    >
                        <span className="text-2xl opacity-60 group-hover:opacity-100">❤️</span>
                        {/* Tooltip */}
                        <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            Health Goals & Favorites
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900"></div>
                        </div>
                    </button>

                    {/* 7. Community Recipes */}
                    <button
                        onClick={() => navigate('/community')}
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/5 group ${location.pathname === '/community' ? 'bg-white/20' : ''
                            }`}
                    >
                        <span className="text-2xl opacity-60 group-hover:opacity-100">🌍</span>
                        <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            Community Recipes
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900"></div>
                        </div>
                    </button>

                    {/* 8. Create Recipe */}
                    <button
                        onClick={() => navigate('/create-recipe')}
                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/5 group ${location.pathname === '/create-recipe' ? 'bg-white/20' : ''
                            }`}
                    >
                        <span className="text-2xl opacity-60 group-hover:opacity-100">✍️</span>
                        <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            Share Your Recipe
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900"></div>
                        </div>
                    </button>
                </nav>

                {/* Theme Toggle & Settings - Bottom */}
                <div className="mt-auto space-y-3">
                    {/* Theme Toggle */}
                    <div className="group relative">
                        <button
                            onClick={toggleTheme}
                            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/5"
                        >
                            {isDark ? (
                                <Sun className="w-6 h-6 text-yellow-400 opacity-80 group-hover:opacity-100" />
                            ) : (
                                <Moon className="w-6 h-6 text-violet-300 opacity-80 group-hover:opacity-100" />
                            )}
                        </button>
                        {/* Tooltip */}
                        <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            {isDark ? 'Light Mode' : 'Dark Mode'}
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900"></div>
                        </div>
                    </div>

                    {/* Settings */}
                    <div className="group relative">
                        <button
                            onClick={() => navigate('/settings')}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/5 ${location.pathname === '/settings' ? 'bg-white/20' : ''
                                }`}
                        >
                            <span className="text-2xl opacity-60 group-hover:opacity-100">⚙️</span>
                        </button>
                        {/* Tooltip */}
                        <div className="absolute left-[calc(100%+1rem)] top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-[100] shadow-xl">
                            Profile & Settings
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 ml-20">
                {/* Top Navigation Bar with Back and Home buttons */}
                {!isHome && (
                    <div className="bg-white/80 backdrop-blur-sm shadow-md px-6 py-4 flex items-center gap-4 sticky top-0 z-40">
                        {/* Back Button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                            <span className="font-semibold text-gray-700 group-hover:text-gray-900">Back</span>
                        </button>

                        {/* Home Button */}
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:shadow-lg text-white rounded-xl transition-all"
                        >
                            <Home className="w-5 h-5" />
                            <span className="font-semibold">Home</span>
                        </button>

                        {/* Page Title */}
                        <div className="ml-4">
                            <h2 className="text-lg font-bold text-gray-900">
                                {location.pathname === '/planner' && '📅 Weekly Meal Planner'}
                                {location.pathname === '/coach' && '🧠 AI Nutrition Coach'}
                                {location.pathname === '/discover' && '🗺️ Regional Discovery'}
                                {location.pathname === '/grocery' && '🛒 Smart Grocery List'}
                                {location.pathname === '/health' && '❤️ Health & Favorites'}
                                {location.pathname === '/settings' && '⚙️ Settings'}
                                {location.pathname === '/community' && '🌍 Community Recipes'}
                                {location.pathname === '/create-recipe' && '✍️ Share Your Recipe'}
                                {location.pathname.startsWith('/community/') && '🍽️ Recipe Details'}
                            </h2>
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <div className="min-h-screen">
                    {children}
                </div>
            </div>
        </div >
    );
};

export default AppLayout;
