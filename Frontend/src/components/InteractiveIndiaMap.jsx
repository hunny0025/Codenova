import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Interactive India heatmap — state circle color intensity driven by recipe count.
 *
 * Props:
 *   counts       — {stateCode: number}  recipe counts per state
 *   names        — {stateCode: string}  state names
 *   maxCount     — number               max recipe count for color scaling
 *   onStateClick — (stateCode) => void
 */
const InteractiveIndiaMap = ({ counts = {}, names = {}, maxCount = 1, onStateClick }) => {
    const [hoveredState, setHoveredState] = useState(null);

    /* ──── State positions on the SVG canvas ──── */
    const statePositions = useMemo(() => ([
        { code: 'JK', x: 175, y: 58 },
        { code: 'HP', x: 210, y: 100 },
        { code: 'PB', x: 180, y: 120 },
        { code: 'UK', x: 250, y: 110 },
        { code: 'HR', x: 220, y: 145 },
        { code: 'DL', x: 235, y: 135 },
        { code: 'RJ', x: 155, y: 205 },
        { code: 'UP', x: 290, y: 180 },
        { code: 'BR', x: 365, y: 210 },
        { code: 'SK', x: 385, y: 160 },
        { code: 'WB', x: 395, y: 250 },
        { code: 'JH', x: 360, y: 245 },
        { code: 'OR', x: 350, y: 295 },
        { code: 'CT', x: 315, y: 295 },
        { code: 'MP', x: 255, y: 260 },
        { code: 'GJ', x: 120, y: 270 },
        { code: 'MH', x: 200, y: 330 },
        { code: 'TS', x: 250, y: 370 },
        { code: 'AP', x: 270, y: 405 },
        { code: 'KA', x: 195, y: 415 },
        { code: 'GA', x: 160, y: 385 },
        { code: 'TN', x: 240, y: 470 },
        { code: 'KL', x: 195, y: 490 },
        { code: 'AS', x: 440, y: 175 },
        { code: 'NL', x: 460, y: 192 },
        { code: 'MN', x: 470, y: 210 },
        { code: 'MZ', x: 455, y: 235 },
        { code: 'ML', x: 425, y: 195 },
    ]), []);

    /* ──── Color interpolation for heatmap ──── */
    const getHeatColor = (count) => {
        if (!count) return '#1e293b';       // no data — dark slate
        const t = Math.min(count / maxCount, 1);
        // Gradient: #2b2b2b → #ff6b6b → #ff0000
        if (t < 0.5) {
            const u = t / 0.5;
            const r = Math.round(43 + (255 - 43) * u);
            const g = Math.round(43 + (107 - 43) * u);
            const b = Math.round(43 + (107 - 43) * u);
            return `rgb(${r},${g},${b})`;
        }
        const u = (t - 0.5) / 0.5;
        const r = 255;
        const g = Math.round(107 - 107 * u);
        const b = Math.round(107 - 107 * u);
        return `rgb(${r},${g},${b})`;
    };

    const getGlowIntensity = (count) => {
        if (!count) return 0;
        return 0.3 + 0.7 * Math.min(count / maxCount, 1);
    };

    /* ──── Find top 3 recipes for tooltip ──── */
    const getTooltipRecipes = (code) => {
        // We only have counts here — show count in tooltip
        const name = names[code] || code;
        const count = counts[code] || 0;
        return { name, count };
    };

    const hoveredInfo = hoveredState ? getTooltipRecipes(hoveredState) : null;
    const hoveredPos = hoveredState ? statePositions.find(s => s.code === hoveredState) : null;

    return (
        <div className="relative w-full">
            <svg viewBox="0 0 550 560" className="w-full h-auto">
                {/* India outline */}
                <path
                    d="M 175 50 C 170 70, 165 90, 170 110 C 160 115, 150 130, 145 150 C 130 170, 115 200, 100 235 C 90 260, 85 275, 95 300 C 100 315, 120 330, 140 345 C 150 355, 155 365, 155 380 C 150 395, 145 410, 155 430 C 165 445, 175 455, 180 470 C 185 485, 190 500, 200 510 C 215 520, 230 515, 245 505 C 260 495, 270 480, 275 460 C 285 445, 290 425, 300 410 C 310 395, 325 375, 340 355 C 355 340, 365 325, 375 310 C 385 295, 395 275, 405 260 C 415 245, 425 230, 435 215 C 445 200, 460 185, 475 175 C 480 165, 475 150, 460 145 C 450 140, 435 142, 420 148 C 405 150, 395 145, 385 140 C 370 135, 355 140, 340 145 C 330 147, 320 140, 310 130 C 300 120, 290 108, 280 95 C 265 80, 250 70, 235 60 C 220 52, 200 48, 185 48 Z"
                    fill="rgba(139, 92, 246, 0.06)"
                    stroke="rgba(139, 92, 246, 0.25)"
                    strokeWidth="1.5"
                />

                {/* State circles with heatmap coloring */}
                {statePositions.map((state) => {
                    const count = counts[state.code] || 0;
                    const color = getHeatColor(count);
                    const glowIntensity = getGlowIntensity(count);
                    const isHovered = hoveredState === state.code;
                    const radius = count > 0 ? 16 + Math.min(count / maxCount, 1) * 6 : 14;

                    return (
                        <g key={state.code}>
                            {/* Outer glow ring */}
                            {count > 0 && (
                                <motion.circle
                                    cx={state.x} cy={state.y}
                                    r={radius + 8}
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="1"
                                    opacity={isHovered ? 0.6 : glowIntensity * 0.3}
                                    animate={{ r: isHovered ? radius + 14 : radius + 8 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}

                            {/* Animated glow */}
                            {count > 0 && isHovered && (
                                <motion.circle
                                    cx={state.x} cy={state.y}
                                    r={radius + 20}
                                    fill={color}
                                    opacity={0}
                                    animate={{ opacity: [0, 0.15, 0], r: [radius + 12, radius + 25, radius + 30] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            )}

                            {/* Main circle */}
                            <motion.circle
                                cx={state.x} cy={state.y}
                                r={radius}
                                fill={color}
                                stroke={isHovered ? '#fff' : 'rgba(255,255,255,0.15)'}
                                strokeWidth={isHovered ? 2.5 : 1}
                                className="cursor-pointer"
                                style={{
                                    filter: isHovered
                                        ? `drop-shadow(0 0 12px ${color}) drop-shadow(0 0 24px ${color})`
                                        : count > 0
                                            ? `drop-shadow(0 0 ${glowIntensity * 8}px ${color})`
                                            : 'none',
                                    transition: 'filter 0.3s ease, stroke 0.2s ease',
                                }}
                                onMouseEnter={() => setHoveredState(state.code)}
                                onMouseLeave={() => setHoveredState(null)}
                                onClick={() => onStateClick?.(state.code)}
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.95 }}
                            />

                            {/* State code label */}
                            <text
                                x={state.x} y={state.y + 4}
                                textAnchor="middle"
                                fill="#fff"
                                fontSize="10"
                                fontWeight="700"
                                className="pointer-events-none select-none"
                                style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}
                            >
                                {state.code}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Hover tooltip */}
            <AnimatePresence>
                {hoveredInfo && hoveredPos && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute pointer-events-none z-30 px-4 py-3 rounded-xl border"
                        style={{
                            left: `${(hoveredPos.x / 550) * 100}%`,
                            top: `${(hoveredPos.y / 560) * 100 - 12}%`,
                            transform: 'translate(-50%, -100%)',
                            background: 'rgba(13, 17, 23, 0.95)',
                            borderColor: 'rgba(139, 92, 246, 0.4)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(12px)',
                        }}
                    >
                        <p className="text-white font-bold text-sm">{hoveredInfo.name}</p>
                        <p className="text-violet-400 text-xs mt-0.5">
                            {hoveredInfo.count > 0
                                ? `🍽️ ${hoveredInfo.count} popular recipe${hoveredInfo.count !== 1 ? 's' : ''}`
                                : 'No data yet'}
                        </p>
                        <p className="text-gray-500 text-[10px] mt-1">Click to explore →</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Color scale legend */}
            <div className="flex items-center justify-center gap-3 mt-4">
                <span className="text-gray-500 text-xs">Less recipes</span>
                <div className="flex gap-0.5">
                    {[0, 0.2, 0.4, 0.6, 0.8, 1].map((t) => (
                        <div
                            key={t}
                            className="w-6 h-3 rounded-sm"
                            style={{ background: getHeatColor(t * maxCount) }}
                        />
                    ))}
                </div>
                <span className="text-gray-500 text-xs">More recipes</span>
            </div>
        </div>
    );
};

export default InteractiveIndiaMap;
