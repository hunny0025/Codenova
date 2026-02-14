import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import InteractiveIndiaMap from '../components/InteractiveIndiaMap';
import RecipeModal from '../components/RecipeModal';
import { useRegionalRecipes } from '../hooks/useRegionalRecipes';

const RegionalDiscovery = () => {
    const { counts, names, maxCount, loading, stateData, stateLoading, fetchState } = useRegionalRecipes();
    const [modalOpen, setModalOpen] = useState(false);

    const handleStateClick = useCallback((code) => {
        fetchState(code);
        setModalOpen(true);
    }, [fetchState]);

    const handleClose = useCallback(() => {
        setModalOpen(false);
    }, []);

    /* ──── Stats bar ──── */
    const totalStates = Object.keys(counts).length;
    const totalRecipes = Object.values(counts).reduce((sum, c) => sum + c, 0);
    const topState = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

    return (
        <div className="min-h-screen p-6 md:p-8" style={{ background: '#0D1117' }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-4xl font-display font-bold flex items-center gap-3 mb-2" style={{ color: '#F8FAFC' }}>
                    🗺️ India's Flavor Heatmap
                </h1>
                <p style={{ color: '#A1A1AA' }}>
                    Click any state to discover its authentic regional recipes
                </p>
            </motion.div>

            {loading ? (
                <div className="flex items-center justify-center py-32">
                    <Loader2 className="w-10 h-10 animate-spin text-violet-500" />
                </div>
            ) : (
                <>
                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-3 gap-4 mb-8 max-w-2xl"
                    >
                        {[
                            { label: 'States Covered', value: totalStates, emoji: '🏛️' },
                            { label: 'Total Recipes', value: totalRecipes, emoji: '🍛' },
                            { label: 'Most Popular', value: topState ? names[topState[0]] : '—', emoji: '🔥' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl p-4 border text-center"
                                style={{
                                    background: 'rgba(22, 27, 34, 0.6)',
                                    borderColor: 'rgba(139, 92, 246, 0.15)',
                                }}
                            >
                                <span className="text-2xl">{stat.emoji}</span>
                                <div className="text-xl font-bold text-white mt-1">{stat.value}</div>
                                <div className="text-xs text-gray-500">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Main Layout: Map + Side Panel */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
                        {/* Map */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="rounded-3xl p-6 md:p-8 border"
                            style={{
                                background: 'rgba(22, 27, 34, 0.6)',
                                borderColor: 'rgba(139, 92, 246, 0.2)',
                                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.08)',
                            }}
                        >
                            <InteractiveIndiaMap
                                counts={counts}
                                names={names}
                                maxCount={maxCount}
                                onStateClick={handleStateClick}
                            />
                        </motion.div>

                        {/* Right Panel — State list sorted by recipe count */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="rounded-3xl p-6 border h-fit max-h-[75vh] overflow-y-auto"
                            style={{
                                background: 'rgba(22, 27, 34, 0.6)',
                                borderColor: 'rgba(139, 92, 246, 0.2)',
                            }}
                        >
                            <h3 className="text-lg font-bold text-white mb-4">📊 States by Popularity</h3>
                            <div className="space-y-2">
                                {Object.entries(counts)
                                    .sort((a, b) => b[1] - a[1])
                                    .map(([code, count], idx) => {
                                        const pct = Math.round((count / maxCount) * 100);
                                        return (
                                            <motion.button
                                                key={code}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.05 * idx }}
                                                onClick={() => handleStateClick(code)}
                                                className="w-full flex items-center gap-3 p-3 rounded-xl border transition-all hover:scale-[1.02] group cursor-pointer"
                                                style={{
                                                    background: 'rgba(22, 27, 34, 0.4)',
                                                    borderColor: 'rgba(139, 92, 246, 0.1)',
                                                }}
                                                whileHover={{
                                                    borderColor: 'rgba(139, 92, 246, 0.4)',
                                                    boxShadow: '0 4px 16px rgba(139, 92, 246, 0.15)',
                                                }}
                                            >
                                                {/* Rank */}
                                                <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                                                    style={{
                                                        background: idx < 3 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(139, 92, 246, 0.1)',
                                                        color: idx < 3 ? '#F59E0B' : '#A78BFA',
                                                    }}>
                                                    {idx + 1}
                                                </span>

                                                {/* Info */}
                                                <div className="flex-1 text-left min-w-0">
                                                    <div className="text-sm font-semibold text-white truncate">
                                                        {names[code] || code}
                                                    </div>
                                                    {/* Progress bar */}
                                                    <div className="w-full h-1.5 rounded-full mt-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                        <motion.div
                                                            className="h-full rounded-full"
                                                            style={{ background: 'linear-gradient(90deg, #7C3AED, #E11D48)' }}
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${pct}%` }}
                                                            transition={{ delay: 0.1 * idx, duration: 0.6 }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Count */}
                                                <span className="text-xs font-bold px-2 py-1 rounded-lg"
                                                    style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#A78BFA' }}>
                                                    {count}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}

            {/* Recipe Modal */}
            {modalOpen && (
                <RecipeModal
                    stateData={stateData}
                    stateLoading={stateLoading}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default RegionalDiscovery;
