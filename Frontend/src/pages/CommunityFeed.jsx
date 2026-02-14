import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, TrendingUp, Clock, IndianRupee, MapPin, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CommunityRecipeCard from '../components/CommunityRecipeCard';

const API_URL = 'http://127.0.0.1:5000/api';

const SORT_OPTIONS = [
    { key: 'popular', label: 'Most Liked', icon: TrendingUp },
    { key: 'newest', label: 'Newest', icon: Clock },
    { key: 'budget', label: 'Budget-Friendly', icon: IndianRupee },
];

const DIET_FILTERS = ['all', 'veg', 'vegan', 'jain', 'non-veg'];

const CommunityFeed = () => {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('newest');
    const [dietFilter, setDietFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchRecipes = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ sort: sortBy });
            if (dietFilter !== 'all') params.append('diet', dietFilter);

            const res = await fetch(`${API_URL}/community/recipes?${params}`);
            const data = await res.json();
            setRecipes(data.recipes || []);
        } catch (e) {
            console.error('Failed to fetch community recipes:', e);
            setRecipes([]);
        }
        setLoading(false);
    };

    useEffect(() => { fetchRecipes(); }, [sortBy, dietFilter]);

    const handleLike = async (recipeId) => {
        try {
            const res = await fetch(`${API_URL}/community/recipes/${recipeId}/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: 'current_user' }),
            });
            if (res.ok) {
                const data = await res.json();
                setRecipes(prev => prev.map(r =>
                    r.id === recipeId ? { ...r, likes: data.likes } : r
                ));
            }
        } catch (e) {
            console.error('Like failed:', e);
        }
    };

    // Client-side search filter
    const filteredRecipes = searchQuery
        ? recipes.filter(r =>
            r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.cuisine?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.region?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.author_name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : recipes;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
                >
                    <div>
                        <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                            <span className="text-4xl">🌍</span> Community Recipes
                        </h1>
                        <p className="text-gray-400 mt-1">Discover recipes shared by the FlavorSense community</p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/create-recipe')}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                    >
                        <Plus className="w-5 h-5" /> Share Your Recipe
                    </motion.button>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 space-y-4"
                >
                    {/* Search */}
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search recipes, cuisines, chefs..."
                            className="input-field pl-12"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Sort buttons */}
                        <div className="flex gap-2">
                            {SORT_OPTIONS.map(opt => {
                                const Icon = opt.icon;
                                return (
                                    <button
                                        key={opt.key}
                                        onClick={() => setSortBy(opt.key)}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${sortBy === opt.key
                                            ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" /> {opt.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Diet filter */}
                        <div className="flex gap-2 flex-wrap">
                            {DIET_FILTERS.map(diet => (
                                <button
                                    key={diet}
                                    onClick={() => setDietFilter(diet)}
                                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${dietFilter === diet
                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    {diet === 'all' ? '🍽️ All' : diet === 'veg' ? '🟢 Veg' : diet === 'vegan' ? '🌱 Vegan' : diet === 'jain' ? '☸️ Jain' : '🔴 Non-veg'}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Recipe Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-10 h-10 text-violet-400 animate-spin" />
                    </div>
                ) : filteredRecipes.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4 opacity-40">🍳</div>
                        <h3 className="text-xl font-bold text-gray-400 mb-2">No recipes found</h3>
                        <p className="text-gray-500 mb-6">Be the first to share a recipe!</p>
                        <button
                            onClick={() => navigate('/create-recipe')}
                            className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-lg transition-all"
                        >
                            Create Recipe
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredRecipes.map((recipe, idx) => (
                            <motion.div
                                key={recipe.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <CommunityRecipeCard recipe={recipe} onLike={handleLike} />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Community stat */}
                {!loading && filteredRecipes.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <p className="text-sm text-gray-500">
                            <span className="text-violet-400 font-semibold">🤖 AI Insight:</span>{' '}
                            User recipes turn FlavorSense into a learning ecosystem where community data improves personalization for everyone.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CommunityFeed;
