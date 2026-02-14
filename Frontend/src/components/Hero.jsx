import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';

const Hero = ({ onStartCooking }) => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate floating particles with vibrant colors
        const colors = ['#10B981', '#F59E0B', '#EC4899', '#FB923C', '#34D399'];
        const newParticles = Array.from({ length: 25 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 10 + 6,
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 5,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full opacity-50 blur-sm"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                            backgroundColor: particle.color,
                        }}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 20, -20, 0],
                            scale: [1, 1.3, 0.9, 1],
                            opacity: [0.3, 0.7, 0.3]
                        }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            {/* Gradient overlay */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `radial-gradient(circle at 25% 40%, rgba(16, 185, 129, 0.4) 0%, transparent 50%),
                           radial-gradient(circle at 75% 70%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
                           radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.4) 0%, transparent 50%)`,
                }}
            />

            {/* Main content */}
            <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
                {/* Logo Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="mb-10 inline-block"
                >
                    <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-emerald-500 via-amber-500 to-pink-500 flex items-center justify-center text-6xl shadow-2xl">
                        🍽️
                    </div>
                </motion.div>

                {/* Title with clean gradient */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-7xl md:text-9xl font-display font-black mb-8 leading-tight"
                >
                    <span
                        className="bg-gradient-to-r from-emerald-400 via-amber-400 to-pink-500 bg-clip-text text-transparent"
                        style={{
                            textShadow: '0 0 80px rgba(16, 185, 129, 0.3)',
                        }}
                    >
                        FlavourFit
                    </span>
                    <br />
                    <span className="text-white text-6xl md:text-7xl">AI</span>
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-2xl md:text-4xl text-gray-300 font-semibold mb-6"
                >
                    Your Indian Taste, <span className="text-emerald-400">AI Perfected</span>
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="text-lg md:text-xl text-gray-400 mb-14 max-w-3xl mx-auto leading-relaxed"
                >
                    Discover personalized regional recipes powered by AI taste vectors.
                    From Mumbai's Vada Pav to Kerala's Appam - your nutrition journey starts here.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onStartCooking}
                        className="px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-300"
                    >
                        <ChefHat className="w-7 h-7" />
                        Start Cooking
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 text-xl font-bold text-emerald-400 border-2 border-emerald-400 hover:bg-emerald-400 hover:text-white rounded-2xl transition-all duration-300"
                    >
                        Explore Features
                    </motion.button>
                </motion.div>

                {/* Feature badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="flex flex-wrap justify-center gap-4"
                >
                    {[
                        { icon: '🗺️', text: '28 States', color: 'from-emerald-500 to-emerald-600' },
                        { icon: '🤖', text: 'AI Powered', color: 'from-amber-500 to-amber-600' },
                        { icon: '🍽️', text: '50+ Recipes', color: 'from-pink-500 to-pink-600' },
                        { icon: '📱', text: 'Offline Ready', color: 'from-purple-500 to-purple-600' }
                    ].map((badge, i) => (
                        <motion.div
                            key={badge.text}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className={`glass px-6 py-3 rounded-full flex items-center gap-3 border border-gray-700 hover:border-${badge.color.split('-')[1]}-500 transition-all`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.3 + i * 0.1 }}
                        >
                            <span className="text-3xl">{badge.icon}</span>
                            <span className={`text-white font-semibold bg-gradient-to-r ${badge.color} bg-clip-text text-transparent`}>
                                {badge.text}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-7 h-12 border-2 border-emerald-400 rounded-full flex justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 16, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 bg-emerald-400 rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
