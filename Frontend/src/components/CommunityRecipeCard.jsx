import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChefHat, Flame, IndianRupee, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Cuisine-based gradient backgrounds for cards without images
const CUISINE_GRADIENTS = {
    'North Indian': 'from-orange-600/40 to-red-600/40',
    'South Indian': 'from-emerald-600/40 to-yellow-600/40',
    'Mughlai': 'from-amber-600/40 to-rose-600/40',
    'Gujarati': 'from-green-600/40 to-lime-600/40',
    'Rajasthani': 'from-orange-600/40 to-amber-600/40',
    'Bengali': 'from-yellow-600/40 to-orange-600/40',
    'Punjabi': 'from-red-600/40 to-orange-600/40',
    'Kerala': 'from-green-600/40 to-emerald-600/40',
    'Goan': 'from-teal-600/40 to-cyan-600/40',
    'Street Food': 'from-rose-600/40 to-pink-600/40',
    'default': 'from-violet-600/40 to-indigo-600/40',
};

const CUISINE_EMOJIS = {
    'North Indian': '🍛', 'South Indian': '🥘', 'Mughlai': '🍗',
    'Gujarati': '🥙', 'Rajasthani': '🫓', 'Bengali': '🐟',
    'Punjabi': '🧈', 'Kerala': '🥥', 'Goan': '🦐',
    'Street Food': '🌮', 'default': '🍽️',
};

const CommunityRecipeCard = ({ recipe, onLike }) => {
    const navigate = useNavigate();
    const gradient = CUISINE_GRADIENTS[recipe.cuisine] || CUISINE_GRADIENTS.default;
    const emoji = CUISINE_EMOJIS[recipe.cuisine] || CUISINE_EMOJIS.default;

    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/community/${recipe.id}`)}
            className="cursor-pointer rounded-2xl overflow-hidden transition-shadow hover:shadow-2xl hover:shadow-violet-500/10"
            style={{ background: 'rgba(22, 27, 34, 0.8)', border: '1px solid rgba(139, 92, 246, 0.15)' }}
        >
            {/* Image / Gradient Header */}
            <div className={`relative h-44 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <span className="text-7xl drop-shadow-2xl">{emoji}</span>

                {/* Diet badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${recipe.diet_type === 'veg' ? 'bg-emerald-500 text-white'
                    : recipe.diet_type === 'vegan' ? 'bg-green-500 text-white'
                        : recipe.diet_type === 'jain' ? 'bg-teal-500 text-white'
                            : 'bg-red-500 text-white'
                    }`}>
                    {recipe.diet_type}
                </div>

                {/* Budget tier */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-amber-400 text-sm font-bold">
                    {recipe.budget_tier}
                </div>

                {/* Spice level */}
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-xs">
                    {'🌶️'.repeat(recipe.spice_level)}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{recipe.title}</h3>

                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                    <ChefHat className="w-3.5 h-3.5" />
                    <span>{recipe.author_name}</span>
                    {recipe.region && (
                        <>
                            <span>•</span>
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{recipe.region}</span>
                        </>
                    )}
                </div>

                {/* Nutrition preview */}
                <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        {recipe.estimated_nutrition?.calories || '—'} cal
                    </span>
                    <span className="flex items-center gap-1">
                        💪 {recipe.estimated_nutrition?.protein || '—'}g
                    </span>
                    <span className="flex items-center gap-1">
                        <IndianRupee className="w-3 h-3 text-emerald-400" />
                        {recipe.estimated_cost || '—'}
                    </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {recipe.health_tags?.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/15 text-violet-300 border border-violet-500/20">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Like button */}
                <div className="flex items-center justify-between">
                    <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onLike?.(recipe.id);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-rose-500/15 transition-colors group"
                    >
                        <Heart className={`w-4 h-4 transition-colors ${recipe.likes > 0 ? 'text-rose-400 fill-rose-400' : 'text-gray-400 group-hover:text-rose-400'}`} />
                        <span className="text-sm text-gray-300">{recipe.likes}</span>
                    </motion.button>

                    <span className="text-xs text-gray-500">
                        {recipe.ingredients?.length || 0} ingredients
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default CommunityRecipeCard;
