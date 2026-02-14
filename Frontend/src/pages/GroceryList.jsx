import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Download, ShoppingCart, Check, X, TrendingUp, TrendingDown } from 'lucide-react';

const GroceryList = () => {
    const [checkedItems, setCheckedItems] = useState([]);
    const [showSubstitutions, setShowSubstitutions] = useState(true);
    const [filterMode, setFilterMode] = useState('all'); // all, veg, budget
    const [language, setLanguage] = useState('en'); // en, hi

    // Grocery items grouped by category
    const groceryCategories = [
        {
            id: 'vegetables',
            name: '🧅 Vegetables',
            items: [
                { id: 'onion', name: 'Onion', quantity: '1 kg', price: 40, inPantry: true, usedIn: 5, tags: ['Used in 5 meals'] },
                { id: 'tomato', name: 'Tomato', quantity: '750 g', price: 45, inPantry: false, usedIn: 4, tags: ['Used in 4 meals'] },
                { id: 'potato', name: 'Potato', quantity: '2 kg', price: 60, inPantry: false, usedIn: 3, tags: ['Budget-friendly'] },
                { id: 'spinach', name: 'Spinach', quantity: '500 g', price: 30, inPantry: false, usedIn: 2, tags: ['High fiber'] }
            ]
        },
        {
            id: 'dairy',
            name: '🥛 Dairy',
            items: [
                { id: 'milk', name: 'Milk', quantity: '1 L', price: 65, inPantry: false, usedIn: 7, tags: ['Used in 7 meals', 'High protein'] },
                { id: 'paneer', name: 'Paneer', quantity: '250 g', price: 120, inPantry: false, usedIn: 3, tags: ['High protein'] },
                { id: 'curd', name: 'Curd', quantity: '500 g', price: 50, inPantry: true, usedIn: 4, tags: ['Already in pantry'] }
            ]
        },
        {
            id: 'grains',
            name: '🌾 Grains',
            items: [
                { id: 'rice', name: 'Rice', quantity: '2 kg', price: 140, inPantry: false, usedIn: 6, tags: ['Used in 6 meals'] },
                { id: 'atta', name: 'Multigrain Atta', quantity: '1 kg', price: 85, inPantry: false, usedIn: 8, tags: ['High fiber'] },
                { id: 'dal', name: 'Toor Dal', quantity: '500 g', price: 95, inPantry: true, usedIn: 5, tags: ['Already in pantry', 'High protein'] }
            ]
        },
        {
            id: 'spices',
            name: '🌶️ Spices & Oil',
            items: [
                { id: 'oil', name: 'Cooking Oil', quantity: '1 L', price: 180, inPantry: false, usedIn: 10, tags: ['Used in 10 meals'] },
                { id: 'turmeric', name: 'Turmeric Powder', quantity: '100 g', price: 40, inPantry: true, usedIn: 8, tags: ['Already in pantry'] },
                { id: 'garam-masala', name: 'Garam Masala', quantity: '50 g', price: 60, inPantry: false, usedIn: 6, tags: ['Used in 6 meals'] }
            ]
        }
    ];

    // Substitution suggestions
    const substitutions = [
        {
            id: 'sub1',
            original: 'Paneer',
            substitute: 'Soy Chunks',
            savings: 40,
            reason: 'Paneer is expensive this week',
            accepted: null
        },
        {
            id: 'sub2',
            original: 'Cooking Oil',
            substitute: 'Olive Oil',
            savings: -20,
            reason: 'Healthier alternative',
            accepted: null
        }
    ];

    const [activeSubstitutions, setActiveSubstitutions] = useState(substitutions);

    // Calculate totals
    const allItems = groceryCategories.flatMap(cat => cat.items);
    const totalCost = allItems.reduce((sum, item) => sum + (item.inPantry ? 0 : item.price), 0);
    const checkedCost = allItems
        .filter(item => checkedItems.includes(item.id) && !item.inPantry)
        .reduce((sum, item) => sum + item.price, 0);
    const remainingCost = totalCost - checkedCost;
    const budget = 1700;
    const savings = budget - totalCost;
    const totalMeals = 21;
    const avgCostPerMeal = Math.round(totalCost / totalMeals);

    const toggleItem = (itemId) => {
        setCheckedItems(prev =>
            prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
        );
    };

    const handleSubstitution = (subId, accept) => {
        setActiveSubstitutions(prev =>
            prev.map(sub => sub.id === subId ? { ...sub, accepted: accept } : sub)
        );
    };

    const exportPDF = () => {
        alert('Exporting grocery list as PDF...');
    };

    const regenerate = () => {
        alert('Regenerating grocery list based on updated meal plan...');
    };

    return (
        <div className="min-h-screen p-8" style={{ background: '#0D1117' }}>
            {/* Header */}
            <div className="rounded-3xl p-6 backdrop-blur-sm border mb-8" style={{
                background: 'rgba(22, 27, 34, 0.6)',
                borderColor: 'rgba(139, 92, 246, 0.2)',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)'
            }}>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-display font-bold flex items-center gap-3 mb-2" style={{ color: '#F8FAFC' }}>
                            🛒 Smart Grocery List
                        </h1>
                        <p style={{ color: '#A1A1AA' }}>Auto-generated from your AI meal plan</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={regenerate}
                            className="px-5 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 border"
                            style={{
                                background: 'rgba(139, 92, 246, 0.1)',
                                borderColor: 'rgba(139, 92, 246, 0.3)',
                                color: '#F8FAFC'
                            }}
                        >
                            <RefreshCw className="w-5 h-5" />
                            Regenerate
                        </button>
                        <button
                            onClick={exportPDF}
                            className="px-5 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 border"
                            style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                borderColor: 'rgba(16, 185, 129, 0.3)',
                                color: '#10B981'
                            }}
                        >
                            <Download className="w-5 h-5" />
                            Export PDF
                        </button>
                        <button className="px-5 py-3 rounded-xl font-semibold transition-all flex items-center gap-2" style={{
                            background: 'linear-gradient(135deg, #E11D48, #BE123C)',
                            color: '#FFFFFF',
                            boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)'
                        }}>
                            <ShoppingCart className="w-5 h-5" />
                            Buy Online
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-4 mt-6 pt-6" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.2)' }}>
                    <span className="text-sm font-semibold" style={{ color: '#A1A1AA' }}>Filters:</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterMode('all')}
                            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                            style={{
                                background: filterMode === 'all' ? '#7C3AED' : 'rgba(22, 27, 34, 0.4)',
                                color: filterMode === 'all' ? '#FFFFFF' : '#A1A1AA'
                            }}
                        >
                            All Items
                        </button>
                        <button
                            onClick={() => setFilterMode('veg')}
                            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                            style={{
                                background: filterMode === 'veg' ? '#10B981' : 'rgba(22, 27, 34, 0.4)',
                                color: filterMode === 'veg' ? '#FFFFFF' : '#A1A1AA'
                            }}
                        >
                            ❤️ Veg Only
                        </button>
                        <button
                            onClick={() => setFilterMode('budget')}
                            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                            style={{
                                background: filterMode === 'budget' ? '#E11D48' : 'rgba(22, 27, 34, 0.4)',
                                color: filterMode === 'budget' ? '#FFFFFF' : '#A1A1AA'
                            }}
                        >
                            💰 Budget-Friendly
                        </button>
                    </div>

                    <div className="ml-auto flex gap-2">
                        <button
                            onClick={() => setLanguage('en')}
                            className="px-3 py-2 rounded-lg text-sm font-semibold"
                            style={{
                                background: language === 'en' ? '#C026D3' : 'rgba(22, 27, 34, 0.4)',
                                color: language === 'en' ? '#FFFFFF' : '#A1A1AA'
                            }}
                        >
                            English
                        </button>
                        <button
                            onClick={() => setLanguage('hi')}
                            className="px-3 py-2 rounded-lg text-sm font-semibold"
                            style={{
                                background: language === 'hi' ? '#C026D3' : 'rgba(22, 27, 34, 0.4)',
                                color: language === 'hi' ? '#FFFFFF' : '#A1A1AA'
                            }}
                        >
                            हिंदी
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content: 2-Column Layout */}
            <div className="grid grid-cols-[1fr_400px] gap-8 mb-8">
                {/* Left: Grocery Items */}
                <div className="space-y-6">
                    {groceryCategories.map((category) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-3xl p-6 backdrop-blur-sm border"
                            style={{
                                background: 'rgba(22, 27, 34, 0.6)',
                                borderColor: 'rgba(139, 92, 246, 0.2)',
                                boxShadow: '0 4px 16px rgba(139, 92, 246, 0.1)'
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-4" style={{ color: '#F8FAFC' }}>{category.name}</h2>

                            <div className="space-y-3">
                                {category.items.map((item) => {
                                    const isChecked = checkedItems.includes(item.id);
                                    const isPantry = item.inPantry;

                                    return (
                                        <motion.div
                                            key={item.id}
                                            className="flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer group border"
                                            style={{
                                                background: isPantry ? 'rgba(22, 27, 34, 0.3)' : isChecked ? 'rgba(16, 185, 129, 0.1)' : 'rgba(22, 27, 34, 0.4)',
                                                borderColor: isPantry ? '#27272A' : isChecked ? '#10B981' : 'rgba(139, 92, 246, 0.15)',
                                                borderWidth: '1px',
                                                opacity: isPantry ? 0.6 : 1
                                            }}
                                            onClick={() => !isPantry && toggleItem(item.id)}
                                        >
                                            {/* Checkbox */}
                                            <div
                                                className="w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all"
                                                style={{
                                                    borderColor: isPantry ? '#71717A' : isChecked ? '#10B981' : '#71717A',
                                                    background: isPantry ? '#27272A' : isChecked ? '#10B981' : 'transparent'
                                                }}
                                            >
                                                {(isChecked || isPantry) && <Check className="w-4 h-4 text-white" />}
                                            </div>

                                            {/* Item Details */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-semibold" style={{ color: isPantry ? '#71717A' : '#F8FAFC' }}>
                                                        {item.name}
                                                    </span>
                                                    <span className="text-sm" style={{ color: '#A1A1AA' }}>— {item.quantity}</span>
                                                </div>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-1">
                                                    {isPantry && (
                                                        <span className="text-xs px-2 py-1 rounded-full font-medium" style={{
                                                            background: '#27272A',
                                                            color: '#A1A1AA'
                                                        }}>
                                                            Already in pantry
                                                        </span>
                                                    )}
                                                    {item.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="text-xs px-2 py-1 rounded-full font-medium"
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
                                            </div>

                                            {/* Price */}
                                            <div className="text-right">
                                                <span className="text-lg font-bold" style={{ color: isPantry ? '#71717A' : '#E11D48' }}>
                                                    ₹{item.price}
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right: Budget & Summary */}
                <div className="space-y-6">
                    {/* Budget Breakdown */}
                    <div className="rounded-3xl p-6 backdrop-blur-sm border" style={{
                        background: 'rgba(22, 27, 34, 0.6)',
                        borderColor: 'rgba(139, 92, 246, 0.2)',
                        boxShadow: '0 4px 16px rgba(139, 92, 246, 0.1)'
                    }}>
                        <h3 className="text-xl font-bold mb-4" style={{ color: '#F8FAFC' }}>💰 Weekly Cost Breakdown</h3>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span style={{ color: '#A1A1AA' }}>Estimated Cost:</span>
                                <span className="text-2xl font-bold" style={{ color: '#F8FAFC' }}>₹{totalCost}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span style={{ color: '#A1A1AA' }}>Your Budget:</span>
                                <span className="text-lg font-semibold" style={{ color: '#E4E4E7' }}>₹{budget}</span>
                            </div>

                            <div className="flex justify-between items-center pt-4" style={{ borderTop: '1px solid rgba(139, 92, 246, 0.2)' }}>
                                <span className="font-semibold" style={{ color: '#F8FAFC' }}>You Saved:</span>
                                <span className="text-2xl font-bold" style={{ color: savings >= 0 ? '#10B981' : '#EF4444' }}>
                                    ₹{Math.abs(savings)}
                                    {savings >= 0 ? ' 🎉' : ' ⚠️'}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="pt-4">
                                <div className="flex justify-between text-sm mb-2" style={{ color: '#A1A1AA' }}>
                                    <span>Budget Usage</span>
                                    <span>{Math.round((totalCost / budget) * 100)}%</span>
                                </div>
                                <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: '#27272A' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min((totalCost / budget) * 100, 100)}%` }}
                                        className="h-full rounded-full"
                                        style={{
                                            background: totalCost <= budget ? 'linear-gradient(to right, #10B981, #059669)' : 'linear-gradient(to right, #EF4444, #DC2626)'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Value Metrics */}
                    <div className="rounded-3xl p-6 backdrop-blur-sm border" style={{
                        background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.1), rgba(139, 92, 246, 0.1))',
                        borderColor: 'rgba(225, 29, 72, 0.3)',
                        boxShadow: '0 4px 16px rgba(225, 29, 72, 0.1)'
                    }}>
                        <h3 className="text-xl font-bold mb-4" style={{ color: '#F8FAFC' }}>📈 Value Metrics</h3>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: 'rgba(22, 27, 34, 0.6)' }}>
                                <span className="font-medium" style={{ color: '#E4E4E7' }}>Meals Covered:</span>
                                <span className="text-xl font-bold" style={{ color: '#E11D48' }}>{totalMeals}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: 'rgba(22, 27, 34, 0.6)' }}>
                                <span className="font-medium" style={{ color: '#E4E4E7' }}>Avg Cost / Meal:</span>
                                <span className="text-xl font-bold" style={{ color: '#E11D48' }}>₹{avgCostPerMeal}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: 'rgba(22, 27, 34, 0.6)' }}>
                                <span className="font-medium" style={{ color: '#E4E4E7' }}>Protein / ₹ Ratio:</span>
                                <span className="text-lg font-bold flex items-center gap-1" style={{ color: '#10B981' }}>
                                    High <TrendingUp className="w-5 h-5" />
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-3 rounded-xl" style={{ background: 'rgba(22, 27, 34, 0.6)' }}>
                                <span className="font-medium" style={{ color: '#E4E4E7' }}>Food Waste Risk:</span>
                                <span className="text-lg font-bold flex items-center gap-1" style={{ color: '#10B981' }}>
                                    Low <TrendingDown className="w-5 h-5" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom: Pantry Intelligence & Substitutions */}
            {showSubstitutions && (
                <div className="rounded-3xl p-6 backdrop-blur-sm border" style={{
                    background: 'rgba(22, 27, 34, 0.6)',
                    borderColor: 'rgba(139, 92, 246, 0.2)',
                    boxShadow: '0 4px 16px rgba(139, 92, 246, 0.1)'
                }}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold" style={{ color: '#F8FAFC' }}>🧠 Pantry & Substitution Suggestions</h3>
                        <button
                            onClick={() => setShowSubstitutions(false)}
                            className="transition-colors"
                            style={{ color: '#71717A' }}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Pantry Intelligence */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-5 bg-gradient-to-br from-violet-50 to-fuchsia-50 rounded-2xl border-2 border-violet-200"
                        >
                            <div className="flex items-start gap-3 mb-3">
                                <span className="text-3xl">✅</span>
                                <div>
                                    <p className="font-semibold text-gray-900 mb-1">You already have onions</p>
                                    <p className="text-sm text-gray-600">Removed from shopping list (saves ₹40)</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Substitution Suggestions */}
                        {activeSubstitutions.map((sub, index) => (
                            <motion.div
                                key={sub.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-5 rounded-2xl border-2 ${sub.accepted === true
                                    ? 'bg-emerald-50 border-emerald-300'
                                    : sub.accepted === false
                                        ? 'bg-gray-50 border-gray-300'
                                        : 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200'
                                    }`}
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <span className="text-3xl">💡</span>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900 mb-1">{sub.reason}</p>
                                        <p className="text-sm text-gray-600 mb-2">
                                            Try <span className="font-bold text-rose-600">{sub.substitute}</span> instead of{' '}
                                            <span className="font-bold">{sub.original}</span>
                                        </p>
                                        <p className={`text-sm font-bold ${sub.savings > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {sub.savings > 0 ? `Save ₹${sub.savings}` : `+₹${Math.abs(sub.savings)} (healthier)`}
                                        </p>
                                    </div>
                                </div>

                                {sub.accepted === null && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleSubstitution(sub.id, true)}
                                            className="flex-1 py-2 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Check className="w-4 h-4" />
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleSubstitution(sub.id, false)}
                                            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <X className="w-4 h-4" />
                                            Keep Original
                                        </button>
                                    </div>
                                )}

                                {sub.accepted === true && (
                                    <div className="text-center py-2 text-emerald-600 font-semibold">✓ Substitution Applied</div>
                                )}

                                {sub.accepted === false && (
                                    <div className="text-center py-2 text-gray-500 font-semibold">Keeping Original</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroceryList;
