import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, ChefHat, Clock, Users, Flame } from 'lucide-react';

const RecipeCard = ({ recipe, onFavorite, isFavorite }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleShare = () => {
        // WhatsApp share functionality
        const text = `Check out this recipe: ${recipe.name} from ${recipe.stateName}!\n\n🔥 ${recipe.nutrition.calories} Cal | 💪 ${recipe.nutrition.protein}g Protein\n\nDiscover more at FlavourFit!`;
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="perspective-1000 h-[500px]">
            <motion.div
                className="relative w-full h-full card-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring' }}
                onClick={handleFlip}
            >
                {/* Front of card */}
                <div className="card-front glass rounded-2xl overflow-hidden cursor-pointer hover-lift">
                    {/* Hero Image */}
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-full object-cover"
                        />

                        {/* Steam effect */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="steam-particle"
                                    style={{
                                        left: `${20 + i * 20}%`,
                                        bottom: '10%',
                                        animationDelay: `${i * 0.4}s`
                                    }}
                                />
                            ))}
                        </div>

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                            {recipe.badges.slice(0, 2).map(badge => (
                                <span
                                    key={badge}
                                    className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>

                        {/* Price tag */}
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-secondary-300 px-4 py-2 rounded-full font-bold text-lg">
                            ₹{recipe.price}
                        </div>

                        {/* Health score badge */}
                        <div className="absolute bottom-3 right-3 bg-primary-500 text-white w-16 h-16 rounded-full flex items-center justify-center flex-col shadow-lg">
                            <div className="text-2xl font-bold">{recipe.healthScore}</div>
                            <div className="text-xs">Score</div>
                        </div>
                    </div>

                    {/* Card content */}
                    <div className="p-5">
                        <h3 className="text-2xl font-bold text-white mb-2">{recipe.name}</h3>
                        <p className="text-primary-300 text-sm mb-4">{recipe.stateName} • {recipe.category}</p>

                        {/* Quick info */}
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-300">
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {recipe.prepTime}
                            </div>
                            <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {recipe.servings} servings
                            </div>
                        </div>

                        {/* Nutrition highlights */}
                        <div className="grid grid-cols-4 gap-2 mb-4">
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-1 text-secondary-400 font-bold">
                                    <Flame className="w-4 h-4" />
                                    {recipe.nutrition.calories}
                                </div>
                                <div className="text-xs text-gray-400">Cal</div>
                            </div>
                            <div className="text-center">
                                <div className="text-secondary-400 font-bold">{recipe.nutrition.protein}g</div>
                                <div className="text-xs text-gray-400">Protein</div>
                            </div>
                            <div className="text-center">
                                <div className="text-secondary-400 font-bold">{recipe.nutrition.carbs}g</div>
                                <div className="text-xs text-gray-400">Carbs</div>
                            </div>
                            <div className="text-center">
                                <div className="text-secondary-400 font-bold">{recipe.nutrition.fiber}g</div>
                                <div className="text-xs text-gray-400">Fiber</div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-2">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFavorite(recipe.id);
                                }}
                                className={`flex-1 glass px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors ${isFavorite ? 'bg-red-500/30' : ''
                                    }`}
                            >
                                <Heart
                                    className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500 animate-pulse' : 'text-white'
                                        }`}
                                />
                            </motion.button>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleShare();
                                }}
                                className="flex-1 glass px-4 py-3 rounded-xl flex items-center justify-center gap-2"
                            >
                                <Share2 className="w-5 h-5 text-white" />
                            </motion.button>
                        </div>

                        <p className="text-xs text-center text-gray-400 mt-3">
                            Tap to see recipe details
                        </p>
                    </div>
                </div>

                {/* Back of card */}
                <div className="card-back glass rounded-2xl overflow-hidden p-6">
                    <div className="h-full overflow-y-auto">
                        <h3 className="text-2xl font-bold text-primary-400 mb-4">{recipe.name}</h3>

                        {/* Ingredients */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                <ChefHat className="w-5 h-5 text-primary-400" />
                                Ingredients
                            </h4>
                            <ul className="space-y-2">
                                {recipe.ingredients.map((ingredient, i) => (
                                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                                        <span className="text-primary-400 mt-1">•</span>
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Instructions */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Instructions</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {recipe.instructions}
                            </p>
                        </div>

                        {/* Detailed Nutrition */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-white mb-3">Nutrition Facts</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {Object.entries(recipe.nutrition).map(([key, value]) => (
                                    <div key={key} className="glass px-3 py-2 rounded-lg">
                                        <div className="text-primary-400 font-bold capitalize">{key}</div>
                                        <div className="text-white text-lg">{value}{key !== 'calories' ? 'g' : ''}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {recipe.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="glass px-3 py-1 rounded-full text-xs text-primary-300"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-xs text-center text-gray-400 mt-6">
                            Tap to flip back
                        </p>
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
        </div>
    );
};

export default RecipeCard;
