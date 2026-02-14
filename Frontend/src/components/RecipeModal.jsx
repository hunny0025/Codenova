import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, Flame, Dumbbell, Wheat, Droplets } from 'lucide-react';

const RecipeModal = ({ stateData, stateLoading, onClose }) => {
    if (!stateData && !stateLoading) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.92, y: 40 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.92, y: 40 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 border"
                    style={{
                        background: 'rgba(13, 17, 23, 0.95)',
                        borderColor: 'rgba(139, 92, 246, 0.3)',
                        boxShadow: '0 25px 60px rgba(139, 92, 246, 0.2)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {stateLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-spin w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full" />
                        </div>
                    ) : stateData ? (
                        <>
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-1">
                                        {stateData.state}
                                    </h2>
                                    <p className="text-violet-400">
                                        {stateData.recipe_count} popular recipe{stateData.recipe_count !== 1 ? 's' : ''}
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-6 h-6 text-gray-400" />
                                </button>
                            </div>

                            {/* Recipe Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {stateData.recipes.map((recipe, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.08 }}
                                        className="rounded-2xl overflow-hidden border group"
                                        style={{
                                            background: 'rgba(22, 27, 34, 0.6)',
                                            borderColor: 'rgba(139, 92, 246, 0.15)',
                                        }}
                                    >
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={recipe.image}
                                                alt={recipe.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                            <div
                                                className="absolute inset-0 items-center justify-center text-6xl hidden"
                                                style={{ background: 'linear-gradient(135deg, #7C3AED, #BE123C)' }}
                                            >
                                                🍛
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute bottom-3 left-3 right-3">
                                                <h3 className="text-xl font-bold text-white">{recipe.name}</h3>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-300">
                                                    {recipe.prepTime && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3.5 h-3.5" /> {recipe.prepTime}
                                                        </span>
                                                    )}
                                                    {recipe.category && (
                                                        <span className="px-2 py-0.5 rounded-full text-xs font-medium"
                                                            style={{ background: 'rgba(124, 58, 237, 0.5)' }}>
                                                            {recipe.category}
                                                        </span>
                                                    )}
                                                    {recipe.diet && (
                                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${recipe.diet === 'veg' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-red-500/30 text-red-300'
                                                            }`}>
                                                            {recipe.diet === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-5 space-y-4">
                                            {/* Nutrition */}
                                            {recipe.nutrition && (
                                                <div className="grid grid-cols-4 gap-2">
                                                    {[
                                                        { label: 'Cal', value: recipe.nutrition.calories, icon: Flame, color: '#F59E0B' },
                                                        { label: 'Protein', value: `${recipe.nutrition.protein}g`, icon: Dumbbell, color: '#10B981' },
                                                        { label: 'Carbs', value: `${recipe.nutrition.carbs}g`, icon: Wheat, color: '#8B5CF6' },
                                                        { label: 'Fat', value: `${recipe.nutrition.fat}g`, icon: Droplets, color: '#F43F5E' },
                                                    ].map((n) => (
                                                        <div key={n.label} className="text-center p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                                            <n.icon className="w-4 h-4 mx-auto mb-1" style={{ color: n.color }} />
                                                            <div className="text-sm font-bold text-white">{n.value}</div>
                                                            <div className="text-[10px] text-gray-500">{n.label}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Ingredients */}
                                            {recipe.ingredients?.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-semibold text-violet-400 mb-2">Ingredients</h4>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {recipe.ingredients.map((ing, i) => (
                                                            <span key={i} className="text-xs px-2.5 py-1 rounded-full text-gray-300"
                                                                style={{ background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                                                                {ing}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Steps */}
                                            {recipe.steps?.length > 0 && (
                                                <div>
                                                    <h4 className="text-sm font-semibold text-violet-400 mb-2">Cooking Steps</h4>
                                                    <ol className="space-y-1.5">
                                                        {recipe.steps.map((step, i) => (
                                                            <li key={i} className="flex gap-2 text-sm text-gray-400">
                                                                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                                                                    style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#A78BFA' }}>
                                                                    {i + 1}
                                                                </span>
                                                                <span>{step}</span>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    ) : null}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default RecipeModal;
