import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ChefHat, MapPin, Flame, ArrowLeft, Calendar, Sparkles, AlertTriangle, IndianRupee, Loader2 } from 'lucide-react';

const API_URL = 'http://127.0.0.1:5000/api';

const FLAVOR_LABELS = ['Sweet', 'Spicy', 'Sour', 'Bitter', 'Umami'];
const FLAVOR_COLORS = ['#F59E0B', '#EF4444', '#10B981', '#8B5CF6', '#EC4899'];

const CommunityRecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await fetch(`${API_URL}/community/recipes/${id}`);
                if (res.ok) {
                    setRecipe(await res.json());
                }
            } catch (e) {
                console.error('Failed to fetch recipe:', e);
            }
            setLoading(false);
        };
        fetchRecipe();
    }, [id]);

    const handleLike = async () => {
        try {
            const res = await fetch(`${API_URL}/community/recipes/${id}/like`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: 'current_user' }),
            });
            if (res.ok) {
                const data = await res.json();
                setRecipe(prev => ({ ...prev, likes: data.likes }));
                setLiked(data.status === 'liked');
            }
        } catch (e) {
            console.error('Like failed:', e);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-violet-400 animate-spin" />
            </div>
        );
    }

    if (!recipe) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🍽️</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Recipe not found</h2>
                    <button onClick={() => navigate('/community')}
                        className="mt-4 px-6 py-3 rounded-xl font-bold text-white bg-violet-500 hover:bg-violet-600 transition-all">
                        Back to Community
                    </button>
                </div>
            </div>
        );
    }

    const maxFlavorVal = Math.max(...(recipe.flavor_profile || [0]), 0.01);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">

                {/* Back button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/community')}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
                >
                    <ArrowLeft className="w-5 h-5" /> Back to Community
                </motion.button>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">{recipe.title}</h1>
                            <div className="flex items-center gap-4 text-gray-400 text-sm flex-wrap">
                                <span className="flex items-center gap-1.5">
                                    <ChefHat className="w-4 h-4 text-violet-400" /> {recipe.author_name}
                                </span>
                                {recipe.region && (
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4 text-rose-400" /> {recipe.region}
                                    </span>
                                )}
                                {recipe.cuisine && (
                                    <span className="px-3 py-1 rounded-full bg-violet-500/15 text-violet-300 text-xs font-semibold">
                                        {recipe.cuisine}
                                    </span>
                                )}
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${recipe.diet_type === 'veg' ? 'bg-emerald-500/20 text-emerald-400'
                                    : recipe.diet_type === 'vegan' ? 'bg-green-500/20 text-green-400'
                                        : recipe.diet_type === 'jain' ? 'bg-teal-500/20 text-teal-400'
                                            : 'bg-red-500/20 text-red-400'
                                    }`}>
                                    {recipe.diet_type}
                                </span>
                                <span>{'🌶️'.repeat(recipe.spice_level || 0)}</span>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleLike}
                                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${liked
                                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                    : 'bg-white/5 text-gray-400 hover:bg-rose-500/10 hover:text-rose-400'
                                    }`}
                            >
                                <Heart className={`w-5 h-5 ${liked ? 'fill-rose-400' : ''}`} />
                                {recipe.likes} {recipe.likes === 1 ? 'Like' : 'Likes'}
                            </motion.button>

                            <button className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-white/5 text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                                <Calendar className="w-5 h-5" /> Add to Plan
                            </button>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left: Main Content */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Ingredients */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="rounded-2xl p-6" style={{ background: 'rgba(22, 27, 34, 0.8)', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                🥘 Ingredients
                                <span className="text-sm font-normal text-gray-500">({recipe.ingredients?.length || 0} items)</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {recipe.ingredients?.map((ing, idx) => (
                                    <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></div>
                                        <span className="text-white font-medium">{ing.name}</span>
                                        <span className="text-gray-500 text-sm ml-auto">{ing.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Steps */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="rounded-2xl p-6" style={{ background: 'rgba(22, 27, 34, 0.8)', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
                            <h2 className="text-xl font-bold text-white mb-4">📝 Instructions</h2>
                            <div className="space-y-4">
                                {recipe.steps?.map((step, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold text-sm shrink-0 mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <p className="text-gray-300 leading-relaxed pt-1">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: AI Analysis Sidebar */}
                    <div className="space-y-6">

                        {/* Nutrition */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                            className="rounded-2xl p-6" style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" /> AI Nutrition
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Calories', value: recipe.estimated_nutrition?.calories, unit: '', icon: '🔥' },
                                    { label: 'Protein', value: recipe.estimated_nutrition?.protein, unit: 'g', icon: '💪' },
                                    { label: 'Carbs', value: recipe.estimated_nutrition?.carbs, unit: 'g', icon: '🍞' },
                                    { label: 'Fat', value: recipe.estimated_nutrition?.fat, unit: 'g', icon: '🥑' },
                                    { label: 'Fiber', value: recipe.estimated_nutrition?.fiber, unit: 'g', icon: '🥬' },
                                    { label: 'Cost', value: `₹${recipe.estimated_cost}`, unit: '', icon: '💰' },
                                ].map(item => (
                                    <div key={item.label} className="bg-white/5 rounded-xl p-3 text-center">
                                        <div className="text-lg mb-0.5">{item.icon}</div>
                                        <div className="text-xl font-bold text-white">{item.value}{item.unit}</div>
                                        <div className="text-xs text-gray-400">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Flavor Profile */}
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                            className="rounded-2xl p-6" style={{ background: 'rgba(139, 92, 246, 0.06)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                            <h3 className="text-lg font-bold text-violet-400 mb-4">🎨 Flavor Profile</h3>
                            <div className="space-y-3">
                                {FLAVOR_LABELS.map((label, idx) => {
                                    const val = recipe.flavor_profile?.[idx] || 0;
                                    const pct = (val / maxFlavorVal) * 100;
                                    return (
                                        <div key={label}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-400">{label}</span>
                                                <span className="text-white font-semibold">{val.toFixed(2)}</span>
                                            </div>
                                            <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${pct}%` }}
                                                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }}
                                                    className="h-full rounded-full"
                                                    style={{ background: FLAVOR_COLORS[idx] }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Health Warnings */}
                        {recipe.health_warnings?.length > 0 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                                className="rounded-2xl p-5" style={{ background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                                <h3 className="text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4" /> Health Notes
                                </h3>
                                {recipe.health_warnings.map((w, i) => (
                                    <p key={i} className="text-xs text-amber-300/70 mb-1">• {w}</p>
                                ))}
                            </motion.div>
                        )}

                        {/* Tags */}
                        {recipe.health_tags?.length > 0 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                                className="flex flex-wrap gap-2">
                                {recipe.health_tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/20">
                                        #{tag}
                                    </span>
                                ))}
                            </motion.div>
                        )}

                        {/* Disclaimer */}
                        <p className="text-[11px] text-gray-600 text-center italic leading-relaxed">
                            Recipes are community shared. Nutrition values are AI-estimated and may vary.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityRecipeDetail;
