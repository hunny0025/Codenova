import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Map, Calendar, Package, User, Moon, Sun, Mic } from 'lucide-react';
import Hero from './components/Hero';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import MealPlanner from './pages/MealPlanner';
import AICoach from './pages/AICoach';
import RegionalDiscovery from './pages/RegionalDiscovery';
import GroceryList from './pages/GroceryList';
import HealthFavorites from './pages/HealthFavorites';
import Settings from './pages/Settings';
import CommunityFeed from './pages/CommunityFeed';
import CreateRecipe from './pages/CreateRecipe';
import CommunityRecipeDetail from './pages/CommunityRecipeDetail';
import AppLayout from './components/AppLayout';
import InteractiveIndiaMap from './components/InteractiveIndiaMap';
import RecipeCard from './components/RecipeCard';
import NutritionDashboard from './components/NutritionDashboard';
import { useFlavorAI } from './hooks/useFlavorAI';
import { ThemeProvider } from './context/ThemeContext';

// Bottom Navigation Component
const BottomNav = ({ darkMode, toggleDarkMode }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { icon: Home, label: 'Home', path: '/home' },
        { icon: Map, label: 'Map', path: '/map' },
        { icon: Calendar, label: 'Plan', path: '/plan' },
        { icon: Package, label: 'Pantry', path: '/pantry' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
            <div className="glass border-t border-dark-700 px-4 py-3">
                <div className="flex justify-around items-center">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <motion.button
                                key={item.path}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => navigate(item.path)}
                                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${isActive ? 'bg-primary-500/20' : ''
                                    }`}
                            >
                                <Icon
                                    className={`w-6 h-6 ${isActive ? 'text-primary-400' : 'text-dark-400'
                                        }`}
                                />
                                <span
                                    className={`text-xs ${isActive ? 'text-primary-400 font-semibold' : 'text-dark-400'
                                        }`}
                                >
                                    {item.label}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// Home Page
const HomePage = ({ favorites, toggleFavorite, voiceSearch }) => {
    const { recommendations, loading, userLocation } = useFlavorAI();
    const [isListening, setIsListening] = useState(false);

    const handleVoiceSearch = () => {
        setIsListening(true);
        setTimeout(() => {
            const mockQuery = "Show high protein recipes";
            const results = voiceSearch(mockQuery);
            console.log('Voice search results:', results);
            setIsListening(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800">
            {/* Voice Search Button */}
            <div className="fixed top-4 right-4 z-40">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleVoiceSearch}
                    className={`glass p-4 rounded-full ${isListening ? 'bg-accent-500/30 animate-pulse' : ''}`}
                >
                    <Mic className={`w-6 h-6 ${isListening ? 'text-accent-400' : 'text-primary-400'}`} />
                </motion.button>
            </div>

            {/* Personalized Recommendations */}
            <div className="pt-20 pb-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h2 className="text-4xl font-display font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent mb-2">
                            Recommended for You
                        </h2>
                        <p className="text-dark-300">
                            Based on your location ({userLocation}) and taste preferences
                        </p>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="spinner" />
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recommendations.slice(0, 6).map((recipe, index) => (
                                <motion.div
                                    key={recipe.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <RecipeCard
                                        recipe={recipe}
                                        onFavorite={toggleFavorite}
                                        isFavorite={favorites.includes(recipe.id)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* AI Explanation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 glass p-6 rounded-2xl max-w-2xl mx-auto border border-primary-500/20"
                    >
                        <p className="text-dark-300 text-center">
                            <span className="text-primary-400 font-semibold">🤖 AI Insight:</span>{' '}
                            Because you loved Vada Pav, we're showing you more Mumbai street food and
                            similar flavor profiles with high savory scores!
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// Plan Page
const PlanPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800 pt-20 pb-24 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-display font-bold bg-gradient-to-r from-secondary-400 to-coral-400 bg-clip-text text-transparent mb-8">
                    Weekly Meal Plan
                </h2>
                <div className="glass p-8 rounded-3xl text-center border border-secondary-500/20">
                    <Calendar className="w-24 h-24 text-secondary-400 mx-auto mb-4" />
                    <p className="text-dark-300 text-lg">
                        Meal planning feature coming soon! AI will create personalized weekly plans
                        based on your nutrition goals and taste preferences.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Pantry Page
const PantryPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800 pt-20 pb-24 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-display font-bold bg-gradient-to-r from-accent-400 to-primary-400 bg-clip-text text-transparent mb-8">
                    Smart Pantry
                </h2>
                <div className="glass p-8 rounded-3xl text-center border border-accent-500/20">
                    <Package className="w-24 h-24 text-accent-400 mx-auto mb-4" />
                    <p className="text-dark-300 text-lg">
                        Drag and drop ingredients to find matching recipes!
                        AI will suggest dishes based on what you have.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Profile Page
const ProfilePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800 pt-20 pb-24 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-display font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-8">
                    Profile
                </h2>
                <div className="glass p-8 rounded-3xl text-center border border-primary-500/20">
                    <User className="w-24 h-24 text-primary-400 mx-auto mb-4" />
                    <p className="text-dark-300 text-lg">
                        Manage your preferences, dietary restrictions, and health goals.
                    </p>
                </div>
            </div>
        </div>
    );
};

// Main App Component
const AppContent = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [showHero, setShowHero] = useState(!isAuthenticated);
    const [darkMode, setDarkMode] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();
    const { voiceSearch } = useFlavorAI();

    const handleLogin = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        setShowHero(true);
        navigate('/');
    };

    const handleSignup = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
        setShowHero(true);
        navigate('/');
    };

    const handleStartCooking = () => {
        setShowHero(false);
        navigate('/home');
    };

    const toggleFavorite = (recipeId) => {
        setFavorites(prev =>
            prev.includes(recipeId)
                ? prev.filter(id => id !== recipeId)
                : [...prev, recipeId]
        );
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className={darkMode ? 'dark' : ''}>
            <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={
                    isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
                } />
                <Route path="/signup" element={
                    isAuthenticated ? <Navigate to="/" /> : <Signup onSignup={handleSignup} />
                } />

                {/* Protected Routes */}
                <Route path="/" element={
                    !isAuthenticated ? (
                        <Navigate to="/login" />
                    ) : (
                        <Navigate to="/dashboard" />
                    )
                } />

                <Route path="/home" element={
                    !isAuthenticated ? <Navigate to="/login" /> :
                        <HomePage favorites={favorites} toggleFavorite={toggleFavorite} voiceSearch={voiceSearch} />
                } />
                <Route path="/map" element={
                    !isAuthenticated ? <Navigate to="/login" /> : <InteractiveIndiaMap />
                } />
                <Route path="/dashboard" element={
                    !isAuthenticated ? <Navigate to="/login" /> : (
                        <AppLayout>
                            <Dashboard />
                        </AppLayout>
                    )
                } />
                <Route path="/planner" element={
                    !isAuthenticated ? <Navigate to="/login" /> : (
                        <AppLayout>
                            <MealPlanner />
                        </AppLayout>
                    )
                } />
                <Route path="/coach" element={
                    !isAuthenticated ? <Navigate to="/login" /> : (
                        <AppLayout>
                            <AICoach />
                        </AppLayout>
                    )
                } />
                <Route path="/discover" element={
                    !isAuthenticated ? <Navigate to="/login" /> : (
                        <AppLayout>
                            <RegionalDiscovery />
                        </AppLayout>
                    )
                } />
                <Route path="/grocery" element={
                    !isAuthenticated ? <Navigate to="/login" /> : (
                        <AppLayout>
                            <GroceryList />
                        </AppLayout>
                    )
                } />
                <Route path="/health" element={
                    !isAuthenticated ? <Navigate to="/login" /> : (
                        <AppLayout>
                            <HealthFavorites />
                        </AppLayout>
                    )
                } />
                <Route path="/settings" element={
                    !isAuthenticated ? <Navigate to="/login" /> : (
                        <AppLayout>
                            <Settings />
                        </AppLayout>
                    )
                } />
                <Route path="/pantry" element={
                    !isAuthenticated ? <Navigate to="/login" /> : <PantryPage />
                } />
                <Route path="/profile" element={
                    !isAuthenticated ? <Navigate to="/login" /> : <ProfilePage />
                } />
                <Route path="/community" element={
                    !isAuthenticated ? <Navigate to="/login" /> : (
                        <AppLayout>
                            <CommunityFeed />
                        </AppLayout>
                    )
                } />
                <Route path="/create-recipe" element={
                    !isAuthenticated ? <Navigate to="/login" /> : (
                        <AppLayout>
                            <CreateRecipe />
                        </AppLayout>
                    )
                } />
                <Route path="/community/:id" element={
                    !isAuthenticated ? <Navigate to="/login" /> : (
                        <AppLayout>
                            <CommunityRecipeDetail />
                        </AppLayout>
                    )
                } />
            </Routes>

            {isAuthenticated && !showHero && <BottomNav darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
        </div>
    );
};

function App() {
    return (
        <ThemeProvider>
            <Router>
                <AppContent />
            </Router>
        </ThemeProvider>
    );
}

export default App;
