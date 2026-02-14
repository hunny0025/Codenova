import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Share2, ChefHat } from 'lucide-react';
import { getRecipesByState, stateRecipes } from '../data/regionalRecipes';
import GlassButton from './GlassButton';

const InteractiveIndiaMap = () => {
    const [selectedState, setSelectedState] = useState(null);
    const [hoveredState, setHoveredState] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const handleStateClick = (stateCode) => {
        setSelectedState(stateCode);
    };

    const handleClose = () => {
        setSelectedState(null);
    };

    const toggleFavorite = (recipeId) => {
        setFavorites(prev =>
            prev.includes(recipeId)
                ? prev.filter(id => id !== recipeId)
                : [...prev, recipeId]
        );

        // Confetti burst effect
        createConfetti();
    };

    const createConfetti = () => {
        const colors = ['#FBBF24', '#F59E0B', '#D97706', '#FEF3C7'];
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.3 + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);
        }
    };

    const stateData = [
        { code: 'MH', name: 'Maharashtra', cx: 320, cy: 380 },
        { code: 'KA', name: 'Karnataka', cx: 310, cy: 480 },
        { code: 'TN', name: 'Tamil Nadu', cx: 340, cy: 550 },
        { code: 'DL', name: 'Delhi', cx: 320, cy: 180 },
        { code: 'PB', name: 'Punjab', cx: 300, cy: 140 },
        { code: 'GJ', name: 'Gujarat', cx: 260, cy: 320 },
        { code: 'WB', name: 'West Bengal', cx: 450, cy: 320 },
        { code: 'RJ', name: 'Rajasthan', cx: 280, cy: 240 },
        { code: 'KL', name: 'Kerala', cx: 310, cy: 560 },
        { code: 'UP', name: 'Uttar Pradesh', cx: 360, cy: 220 },
    ];

    const recipes = selectedState ? getRecipesByState(selectedState) : [];

    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-900 to-dark-800 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl font-display font-bold text-center mb-4 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                        Explore India's Flavors
                    </h2>
                    <p className="text-center text-dark-300 text-lg mb-12">
                        Click on any state to discover authentic regional recipes
                    </p>
                </motion.div>

                {/* SVG India Map */}
                <div className="relative max-w-4xl mx-auto">
                    <svg
                        viewBox="0 0 600 700"
                        className="w-full h-auto"
                        style={{ filter: 'drop-shadow(0 10px 30px rgba(245, 158, 11, 0.3))' }}
                    >
                        {/* Simplified India outline */}
                        <path
                            d="M 300 100 L 350 120 L 380 160 L 400 200 L 420 250 L 450 300 L 480 350 L 490 400 L 480 450 L 460 500 L 440 530 L 400 560 L 360 580 L 320 590 L 280 580 L 250 560 L 230 530 L 220 500 L 210 450 L 200 400 L 190 350 L 180 300 L 200 250 L 230 200 L 260 160 L 280 130 Z"
                            fill="rgba(251, 191, 36, 0.1)"
                            stroke="#F59E0B"
                            strokeWidth="2"
                        />

                        {/* State markers */}
                        {stateData.map((state) => (
                            <g key={state.code}>
                                <motion.circle
                                    cx={state.cx}
                                    cy={state.cy}
                                    r={hoveredState === state.code ? 25 : 20}
                                    fill={selectedState === state.code ? '#10B981' : hoveredState === state.code ? '#F59E0B' : '#374151'}
                                    stroke="#1F2937"
                                    strokeWidth="2"
                                    className="cursor-pointer transition-all duration-300"
                                    onMouseEnter={() => setHoveredState(state.code)}
                                    onMouseLeave={() => setHoveredState(null)}
                                    onClick={() => handleStateClick(state.code)}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    style={{
                                        filter: hoveredState === state.code ? 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.8))' : 'none',
                                    }}
                                />
                                <text
                                    x={state.cx}
                                    y={state.cy + 5}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="12"
                                    fontWeight="bold"
                                    className="pointer-events-none"
                                >
                                    {state.code}
                                </text>
                            </g>
                        ))}
                    </svg>

                    {/* Hover tooltip */}
                    <AnimatePresence>
                        {hoveredState && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute top-4 left-1/2 transform -translate-x-1/2 glass px-6 py-3 rounded-xl"
                            >
                                <div className="glass px-4 py-2 rounded-lg border border-primary-500/30">
                                    <p className="text-white font-semibold">{stateData.find(s => s.code === hoveredState)?.name}</p>
                                    <p className="text-primary-300 text-sm">Click to explore</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* State Details Flyout Panel */}
                <AnimatePresence>
                    {selectedState && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                            onClick={handleClose}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 50 }}
                                className="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-8"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-3xl font-bold text-primary-400">
                                        {stateData.find(s => s.code === selectedState)?.name} Delicacies
                                    </h3>
                                    <button
                                        onClick={handleClose}
                                        className="glass p-2 rounded-full hover:bg-white/20 transition-colors"
                                    >
                                        <X className="w-6 h-6 text-white" />
                                    </button>
                                </div>

                                {/* Recipe Cards Grid */}
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {recipes.map((recipe, index) => (
                                        <motion.div
                                            key={recipe.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="glass rounded-2xl overflow-hidden hover-lift"
                                        >
                                            {/* Recipe Image */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={recipe.image}
                                                    alt={recipe.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                {/* Steam effect overlay */}
                                                <div className="absolute inset-0 pointer-events-none">
                                                    {[...Array(3)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="steam-particle"
                                                            style={{
                                                                left: `${30 + i * 20}%`,
                                                                bottom: '20%',
                                                                animationDelay: `${i * 0.5}s`
                                                            }}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Badges */}
                                                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                                                    {recipe.badges.map(badge => (
                                                        <span
                                                            key={badge}
                                                            className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-semibold"
                                                        >
                                                            {badge}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Price */}
                                                <div className="absolute top-3 left-3 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                    {recipe.category}
                                                </div>
                                                <div className="absolute top-2 right-2 bg-black/60 text-primary-300 px-3 py-1 rounded-full font-bold">
                                                    ₹{recipe.price}
                                                </div>
                                            </div>

                                            {/* Recipe Info */}
                                            <div className="p-4">
                                                <h4 className="text-xl font-bold text-white mb-2">
                                                    {recipe.name}
                                                </h4>
                                                <p className="text-sm text-gray-300 mb-3">
                                                    {recipe.prepTime} • {recipe.servings} servings
                                                </p>

                                                {/* Nutrition */}
                                                <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                                                    <div className="text-center">
                                                        <div className="text-saffron-400 font-bold">{recipe.nutrition.calories}</div>
                                                        <div className="text-gray-400">Cal</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-saffron-400 font-bold">{recipe.nutrition.protein}g</div>
                                                        <div className="text-gray-400">Protein</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-saffron-400 font-bold">{recipe.nutrition.carbs}g</div>
                                                        <div className="text-gray-400">Carbs</div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <motion.button
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => toggleFavorite(recipe.id)}
                                                        className={`flex-1 glass px-4 py-2 rounded-xl flex items-center justify-center gap-2 ${favorites.includes(recipe.id) ? 'bg-red-500/30' : ''
                                                            }`}
                                                    >
                                                        <Heart
                                                            className={`w-5 h-5 ${favorites.includes(recipe.id) ? 'fill-red-500 text-red-500' : 'text-white'
                                                                }`}
                                                        />
                                                    </motion.button>
                                                    <motion.button
                                                        whileTap={{ scale: 0.9 }}
                                                        className="flex-1 glass px-4 py-2 rounded-xl flex items-center justify-center gap-2"
                                                    >
                                                        <Share2 className="w-5 h-5 text-white" />
                                                    </motion.button>
                                                    <motion.button
                                                        whileTap={{ scale: 0.9 }}
                                                        className="flex-1 bg-saffron-500 px-4 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold"
                                                    >
                                                        <ChefHat className="w-5 h-5" />
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
        .confetti-piece {
          position: fixed;
          width: 10px;
          height: 10px;
          top: 50%;
          animation: confetti-fall 2s ease-out forwards;
          z-index: 9999;
        }

        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
};

export default InteractiveIndiaMap;
