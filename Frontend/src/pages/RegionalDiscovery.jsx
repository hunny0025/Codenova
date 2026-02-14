import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const RegionalDiscovery = () => {
    const [selectedState, setSelectedState] = useState('PB'); // Punjab selected by default
    const [hoveredState, setHoveredState] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    // State data with coordinates for SVG map
    const states = {
        'PB': { name: 'Punjab', x: 180, y: 120, dishes: 5 },
        'HR': { name: 'Haryana', x: 220, y: 140, dishes: 4 },
        'DL': { name: 'Delhi', x: 230, y: 130, dishes: 6 },
        'RJ': { name: 'Rajasthan', x: 150, y: 200, dishes: 7 },
        'UP': { name: 'Uttar Pradesh', x: 280, y: 180, dishes: 8 },
        'MH': { name: 'Maharashtra', x: 200, y: 300, dishes: 9 },
        'GJ': { name: 'Gujarat', x: 120, y: 250, dishes: 6 },
        'KA': { name: 'Karnataka', x: 180, y: 380, dishes: 7 },
        'TN': { name: 'Tamil Nadu', x: 220, y: 450, dishes: 8 },
        'KL': { name: 'Kerala', x: 180, y: 480, dishes: 6 },
        'WB': { name: 'West Bengal', x: 380, y: 220, dishes: 7 },
        'OR': { name: 'Odisha', x: 360, y: 280, dishes: 5 }
    };

    // Regional dishes data
    const regionalDishes = {
        'PB': {
            name: 'Punjab',
            subtitle: 'Popular regional dishes personalized for you',
            tags: ['🌶️ Spicy', '❤️ Vegetarian', '💪 High Protein', '💰 Budget-Friendly'],
            dishes: [
                { name: 'Butter Chicken', price: 180, emoji: '🍗' },
                { name: 'Amritsari Kulcha', price: 45, emoji: '🥙' },
                { name: 'Sarson da Saag', price: 65, emoji: '🥬' },
                { name: 'Paneer Tikka', price: 120, emoji: '🥟' },
                { name: 'Dal Makhani', price: 95, emoji: '🍛' }
            ],
            recipeCards: [
                {
                    id: 1,
                    name: 'Butter Chicken',
                    subtitle: 'Murgh Makhani',
                    tags: ['🌶️ Spicy', '🍗 Non-Veg', '💰 Premium'],
                    image: '🍗',
                    price: 180
                },
                {
                    id: 2,
                    name: 'Amritsari Kulcha',
                    subtitle: 'Stuffed Flatbread',
                    tags: ['❤️ Veg', '🥄 15min', '💰 Budget'],
                    image: '🥙',
                    price: 45
                },
                {
                    id: 3,
                    name: 'Sarson da Saag',
                    subtitle: 'Mustard Greens',
                    tags: ['❤️ Veg', '💪 High Fiber', '🌿 Healthy'],
                    image: '🥬',
                    price: 65
                },
                {
                    id: 4,
                    name: 'Paneer Tikka',
                    subtitle: 'Grilled Cottage Cheese',
                    tags: ['❤️ Veg', '💪 High Protein', '🔥 Trending'],
                    image: '🥟',
                    price: 120
                },
                {
                    id: 5,
                    name: 'Dal Makhani',
                    subtitle: 'Creamy Black Lentils',
                    tags: ['❤️ Veg', '🥄 30min', '🌶️ Medium'],
                    image: '🍛',
                    price: 95
                }
            ]
        }
    };

    const currentRegion = regionalDishes[selectedState] || regionalDishes['PB'];
    const visibleCards = 4;

    const nextCard = () => {
        if (currentCardIndex < currentRegion.recipeCards.length - visibleCards) {
            setCurrentCardIndex(currentCardIndex + 1);
        }
    };

    const prevCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
        }
    };

    return (
        <div className="min-h-screen p-8" style={{ background: '#0D1117' }}>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-display font-bold flex items-center gap-3 mb-2" style={{ color: '#F8FAFC' }}>
                    🗺️ Explore India's Flavors
                </h1>
                <p style={{ color: '#A1A1AA' }}>Discover authentic regional recipes from across India</p>
            </div>

            {/* Main 2-Column Layout */}
            <div className="grid grid-cols-[60% 40%] gap-8 mb-8">
                {/* Left: Interactive SVG Map (60%) */}
                <div className="rounded-3xl p-8 backdrop-blur-sm border" style={{
                    background: 'rgba(22, 27, 34, 0.6)',
                    borderColor: 'rgba(139, 92, 246, 0.2)',
                    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)'
                }}>
                    <svg
                        viewBox="0 0 500 650"
                        className="w-full h-auto"
                    >
                        {/* Accurate India outline */}
                        <path
                            d="M 180 90 L 200 85 L 220 82 L 240 80 L 260 82 L 280 87 L 295 95 L 305 105 L 312 118 L 318 133 L 322 148 L 325 165 L 328 182 L 332 198 L 338 213 L 345 227 L 353 240 L 362 252 L 372 263 L 383 273 L 395 282 L 407 290 L 418 297 L 428 305 L 436 314 L 442 324 L 446 335 L 448 347 L 448 360 L 446 373 L 442 386 L 436 398 L 428 409 L 418 419 L 407 428 L 395 436 L 383 443 L 372 450 L 362 457 L 353 465 L 345 474 L 338 484 L 332 495 L 327 507 L 323 520 L 320 533 L 318 546 L 315 558 L 310 568 L 303 576 L 294 582 L 283 586 L 270 588 L 256 588 L 242 586 L 228 582 L 215 576 L 203 568 L 192 558 L 183 546 L 175 533 L 169 520 L 164 507 L 160 495 L 157 484 L 155 474 L 154 465 L 154 457 L 155 450 L 157 443 L 160 436 L 164 428 L 169 419 L 175 409 L 183 398 L 192 386 L 203 373 L 215 360 L 228 347 L 242 335 L 256 324 L 270 314 L 283 305 L 294 297 L 303 290 L 310 282 L 315 273 L 318 263 L 320 252 L 322 240 L 323 227 L 323 213 L 322 198 L 320 182 L 315 165 L 308 148 L 298 133 L 285 118 L 268 105 L 248 95 L 225 87 L 200 82 Z"
                            fill="#BE123C"
                            stroke="#BE123C"
                            strokeWidth="2"
                            opacity="0.3"
                        />

                        {/* State circles */}
                        {Object.entries(states).map(([code, state]) => {
                            const isSelected = selectedState === code;
                            const isHovered = hoveredState === code;

                            return (
                                <g key={code}>
                                    {/* Glow effect for selected state */}
                                    {isSelected && (
                                        <circle
                                            cx={state.x}
                                            cy={state.y}
                                            r="35"
                                            fill="#BE123C"
                                            opacity="0.2"
                                            className="animate-pulse"
                                        />
                                    )}

                                    {/* State circle */}
                                    <motion.circle
                                        cx={state.x}
                                        cy={state.y}
                                        r={isHovered ? 22 : 18}
                                        fill={isSelected ? '#BE123C' : isHovered ? '#7C3AED' : '#BE123C'}
                                        stroke={isSelected ? '#BE123C' : '#7C3AED'}
                                        strokeWidth={isSelected ? 3 : 2}
                                        className="cursor-pointer transition-all duration-200"
                                        style={{
                                            filter: isSelected ? 'drop-shadow(0 0 12px rgba(225, 29, 72, 0.8))' :
                                                isHovered ? 'drop-shadow(0 0 8px rgba(124, 58, 237, 0.6))' : 'none'
                                        }}
                                        onMouseEnter={() => setHoveredState(code)}
                                        onMouseLeave={() => setHoveredState(null)}
                                        onClick={() => setSelectedState(code)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    />

                                    {/* State code label */}
                                    <text
                                        x={state.x}
                                        y={state.y + 5}
                                        textAnchor="middle"
                                        fill={isSelected ? '#fff' : '#374151'}
                                        fontSize="11"
                                        fontWeight="bold"
                                        className="pointer-events-none"
                                    >
                                        {code}
                                    </text>

                                    {/* Tooltip on hover */}
                                    {isHovered && !isSelected && (
                                        <g>
                                            <rect
                                                x={state.x - 60}
                                                y={state.y - 50}
                                                width="120"
                                                height="30"
                                                fill="#1F2937"
                                                rx="8"
                                                opacity="0.95"
                                            />
                                            <text
                                                x={state.x}
                                                y={state.y - 32}
                                                textAnchor="middle"
                                                fill="#fff"
                                                fontSize="12"
                                                fontWeight="600"
                                            >
                                                {state.name}
                                            </text>
                                        </g>
                                    )}
                                </g>
                            );
                        })}
                    </svg>
                </div>

                {/* Right: State Info Panel (40%) */}
                <div className="rounded-3xl p-8 backdrop-blur-sm border" style={{
                    background: 'rgba(22, 27, 34, 0.6)',
                    borderColor: 'rgba(139, 92, 246, 0.2)',
                    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)'
                }}>
                    <motion.div
                        key={selectedState}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* State name */}
                        <h2 className="text-3xl font-bold mb-2" style={{ color: '#F8FAFC' }}>
                            {currentRegion.name}
                        </h2>

                        {/* Subtitle */}
                        <p className="mb-4" style={{ color: '#A1A1AA' }}>{currentRegion.subtitle}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {currentRegion.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-full text-sm font-semibold border"
                                    style={{
                                        background: '#7C3AED',
                                        borderColor: '#A78BFA',
                                        color: '#FFFFFF'
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Dish list */}
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {currentRegion.dishes.map((dish, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer group border"
                                    style={{
                                        background: 'rgba(22, 27, 34, 0.4)',
                                        borderColor: 'rgba(139, 92, 246, 0.15)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'scale(1.02)';
                                        e.currentTarget.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">{dish.emoji}</span>
                                        <span className="font-semibold transition-colors" style={{ color: '#F8FAFC' }}>
                                            {dish.name}
                                        </span>
                                    </div>
                                    <span className="font-bold" style={{ color: '#F43F5E' }}>₹{dish.price}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom: Recipe Cards Carousel (Full Width) */}
            <div className="rounded-3xl p-8 shadow-xl backdrop-blur-sm border" style={{
                background: 'rgba(22, 27, 34, 0.6)',
                borderColor: 'rgba(124, 58, 237, 0.2)'
            }}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold" style={{ color: '#F8FAFC' }}>Featured Recipes</h3>
                    <div className="flex gap-2">
                        <button
                            onClick={prevCard}
                            disabled={currentCardIndex === 0}
                            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <button
                            onClick={nextCard}
                            disabled={currentCardIndex >= currentRegion.recipeCards.length - visibleCards}
                            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Recipe cards */}
                <div className="grid grid-cols-4 gap-6">
                    {currentRegion.recipeCards.slice(currentCardIndex, currentCardIndex + visibleCards).map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-102 transition-all duration-300 cursor-pointer border"
                            style={{
                                background: 'rgba(22, 27, 34, 0.4)',
                                borderColor: 'rgba(124, 58, 237, 0.15)'
                            }}
                        >
                            {/* Card image */}
                            <div className="h-40 flex items-center justify-center" style={{
                                background: 'linear-gradient(135deg, #E11D48, #BE123C)'
                            }}>
                                <span className="text-7xl">{card.image}</span>
                            </div>

                            {/* Card content */}
                            <div className="p-5">
                                <h4 className="font-bold text-lg mb-1" style={{ color: '#F8FAFC' }}>{card.name}</h4>
                                <p className="text-sm mb-3" style={{ color: '#A1A1AA' }}>{card.subtitle}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {card.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="text-xs px-2 py-1 rounded-full font-medium"
                                            style={{
                                                background: '#7C3AED',
                                                color: '#FFFFFF'
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Price and button */}
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-lg" style={{ color: '#F43F5E' }}>₹{card.price}</span>
                                    <button className="px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all group" style={{
                                        background: 'linear-gradient(135deg, #E11D48, #BE123C)',
                                        color: '#FFFFFF'
                                    }}>
                                        View Recipe
                                        <span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RegionalDiscovery;
