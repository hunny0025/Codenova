import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, ChefHat, Sliders, Eye, Volume2, Mic, Type, Users, Sparkles, Camera, Map as MapIcon, Brain, Shield, Download, RotateCcw, Save } from 'lucide-react';

const Settings = () => {
    // Profile settings
    const [profile, setProfile] = useState({
        name: 'Priya Sharma',
        age: 28,
        location: 'Mumbai, Maharashtra',
        cuisine: 'North Indian, South Indian'
    });

    // AI Controls
    const [tasteSensitivity, setTasteSensitivity] = useState(75);
    const [healthStrictness, setHealthStrictness] = useState(85);
    const [budgetStrictness, setBudgetStrictness] = useState(60);
    const [showExplanations, setShowExplanations] = useState(true);

    // Accessibility
    const [voiceInput, setVoiceInput] = useState(true);
    const [voiceOutput, setVoiceOutput] = useState(false);
    const [largeText, setLargeText] = useState(false);
    const [elderFriendly, setElderFriendly] = useState(false);

    // Advanced features
    const [pantryScanner, setPantryScanner] = useState(false);
    const [regionalMap, setRegionalMap] = useState(true);
    const [continuousLearning, setContinuousLearning] = useState(true);

    const handleSave = () => {
        alert('Settings saved successfully! ✅');
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all personalization? This cannot be undone.')) {
            alert('Personalization reset to defaults.');
        }
    };

    const handleExport = () => {
        alert('Exporting your data as JSON...');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-display font-bold text-gray-900 flex items-center gap-3 mb-2">
                    ⚙️ Settings
                </h1>
                <p className="text-gray-600">Control your preferences and how AI works for you</p>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Section 1: Profile & General Preferences */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-6 shadow-xl"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile & General Preferences</h2>
                    <p className="text-sm text-gray-600 mb-6">Used to personalize cultural and nutrition recommendations</p>

                    <div className="space-y-4">
                        {/* Name */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                            <User className="w-6 h-6 text-blue-600" />
                            <div className="flex-1">
                                <label className="text-sm text-gray-600 block mb-1">Name</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full bg-transparent text-gray-900 font-semibold focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Age */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                            <Users className="w-6 h-6 text-green-600" />
                            <div className="flex-1">
                                <label className="text-sm text-gray-600 block mb-1">Age (optional)</label>
                                <input
                                    type="number"
                                    value={profile.age}
                                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                                    className="w-full bg-transparent text-gray-900 font-semibold focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                            <MapPin className="w-6 h-6 text-orange-600" />
                            <div className="flex-1">
                                <label className="text-sm text-gray-600 block mb-1">Location (State / City)</label>
                                <input
                                    type="text"
                                    value={profile.location}
                                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                                    className="w-full bg-transparent text-gray-900 font-semibold focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Preferred Cuisine */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                            <ChefHat className="w-6 h-6 text-purple-600" />
                            <div className="flex-1">
                                <label className="text-sm text-gray-600 block mb-1">Preferred Cuisine</label>
                                <input
                                    type="text"
                                    value={profile.cuisine}
                                    onChange={(e) => setProfile({ ...profile, cuisine: e.target.value })}
                                    className="w-full bg-transparent text-gray-900 font-semibold focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Section 2: AI & Personalization Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-3xl p-6 shadow-xl"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <Sliders className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold text-gray-900">AI & Personalization Controls</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">You control how much the AI influences your meals</p>

                    <div className="space-y-6">
                        {/* Taste Sensitivity */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="font-semibold text-gray-900">Taste Sensitivity</label>
                                <span className="text-sm font-bold text-orange-600">{tasteSensitivity}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={tasteSensitivity}
                                onChange={(e) => setTasteSensitivity(e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                            />
                            <p className="text-xs text-gray-500 mt-2">How strongly AI follows your liked meals</p>
                        </div>

                        {/* Health Strictness */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="font-semibold text-gray-900">Health Strictness</label>
                                <span className="text-sm font-bold text-emerald-600">{healthStrictness}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={healthStrictness}
                                onChange={(e) => setHealthStrictness(e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                            <p className="text-xs text-gray-500 mt-2">How strictly health rules are enforced</p>
                        </div>

                        {/* Budget Strictness */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="font-semibold text-gray-900">Budget Strictness</label>
                                <span className="text-sm font-bold text-blue-600">{budgetStrictness}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={budgetStrictness}
                                onChange={(e) => setBudgetStrictness(e.target.value)}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                            <p className="text-xs text-gray-500 mt-2">Never exceed (100%) vs flexible (0%)</p>
                        </div>

                        {/* Show AI Explanations Toggle */}
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
                            <div className="flex items-center gap-3">
                                <Eye className="w-6 h-6 text-blue-600" />
                                <div>
                                    <p className="font-semibold text-gray-900">Show AI Explanations</p>
                                    <p className="text-xs text-gray-600">Display reasoning for recommendations</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowExplanations(!showExplanations)}
                                className={`relative w-14 h-8 rounded-full transition-colors ${showExplanations ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${showExplanations ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                ></div>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Section 3: Accessibility & Experience */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl p-6 shadow-xl"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Accessibility & Experience</h2>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Voice Input */}
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200">
                            <div className="flex items-center gap-3">
                                <Mic className="w-6 h-6 text-green-600" />
                                <div>
                                    <p className="font-semibold text-gray-900">Voice Input</p>
                                    <p className="text-xs text-gray-600">Hindi / English</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setVoiceInput(!voiceInput)}
                                className={`relative w-14 h-8 rounded-full transition-colors ${voiceInput ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${voiceInput ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                ></div>
                            </button>
                        </div>

                        {/* Voice Output */}
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                            <div className="flex items-center gap-3">
                                <Volume2 className="w-6 h-6 text-purple-600" />
                                <div>
                                    <p className="font-semibold text-gray-900">Voice Output</p>
                                    <p className="text-xs text-gray-600">AI speaks recommendations</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setVoiceOutput(!voiceOutput)}
                                className={`relative w-14 h-8 rounded-full transition-colors ${voiceOutput ? 'bg-purple-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${voiceOutput ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                ></div>
                            </button>
                        </div>

                        {/* Large Text Mode */}
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-200">
                            <div className="flex items-center gap-3">
                                <Type className="w-6 h-6 text-orange-600" />
                                <div>
                                    <p className="font-semibold text-gray-900">Large Text Mode</p>
                                    <p className="text-xs text-gray-600">Easier to read</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setLargeText(!largeText)}
                                className={`relative w-14 h-8 rounded-full transition-colors ${largeText ? 'bg-orange-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${largeText ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                ></div>
                            </button>
                        </div>

                        {/* Elder-Friendly Interface */}
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200">
                            <div className="flex items-center gap-3">
                                <Users className="w-6 h-6 text-blue-600" />
                                <div>
                                    <p className="font-semibold text-gray-900">Elder-Friendly</p>
                                    <p className="text-xs text-gray-600">Simplified interface</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setElderFriendly(!elderFriendly)}
                                className={`relative w-14 h-8 rounded-full transition-colors ${elderFriendly ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${elderFriendly ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                ></div>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Section 4: Advanced & Future Features */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl p-6 shadow-xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Sparkles className="w-6 h-6 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Advanced & Future Features</h2>
                    </div>

                    <div className="space-y-4">
                        {/* Pantry Scanner */}
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200">
                            <div className="flex items-center gap-3">
                                <Camera className="w-6 h-6 text-purple-600" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-gray-900">Pantry Scanner</p>
                                        <span className="px-2 py-0.5 bg-purple-500 text-white text-xs font-bold rounded-full">BETA</span>
                                    </div>
                                    <p className="text-xs text-gray-600">IoT-ready simulation</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setPantryScanner(!pantryScanner)}
                                className={`relative w-14 h-8 rounded-full transition-colors ${pantryScanner ? 'bg-purple-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${pantryScanner ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                ></div>
                            </button>
                        </div>

                        {/* Regional Food Map */}
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
                            <div className="flex items-center gap-3">
                                <MapIcon className="w-6 h-6 text-orange-600" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-gray-900">Regional Map Personalization</p>
                                        <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">BETA</span>
                                    </div>
                                    <p className="text-xs text-gray-600">Location-based dish discovery</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setRegionalMap(!regionalMap)}
                                className={`relative w-14 h-8 rounded-full transition-colors ${regionalMap ? 'bg-orange-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${regionalMap ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                ></div>
                            </button>
                        </div>

                        {/* Continuous Learning */}
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
                            <div className="flex items-center gap-3">
                                <Brain className="w-6 h-6 text-blue-600" />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-gray-900">Continuous Learning Mode</p>
                                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full">BETA</span>
                                    </div>
                                    <p className="text-xs text-gray-600">AI learns from your choices</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setContinuousLearning(!continuousLearning)}
                                className={`relative w-14 h-8 rounded-full transition-colors ${continuousLearning ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${continuousLearning ? 'translate-x-7' : 'translate-x-1'
                                        }`}
                                ></div>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Privacy & Data Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-3xl p-6 shadow-xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-6 h-6 text-emerald-600" />
                        <h2 className="text-2xl font-bold text-gray-900">Privacy & Data</h2>
                    </div>

                    <div className="space-y-3">
                        <button className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl text-left transition-colors flex items-center justify-between">
                            <span className="font-semibold text-gray-900">View Data Usage</span>
                            <span className="text-gray-400">→</span>
                        </button>

                        <button
                            onClick={handleExport}
                            className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl text-left transition-colors flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <Download className="w-5 h-5 text-blue-600" />
                                <span className="font-semibold text-gray-900">Export My Data</span>
                            </div>
                            <span className="text-gray-400">→</span>
                        </button>

                        <button
                            onClick={handleReset}
                            className="w-full p-4 bg-red-50 hover:bg-red-100 rounded-2xl text-left transition-colors flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <RotateCcw className="w-5 h-5 text-red-600" />
                                <span className="font-semibold text-red-600">Reset Personalization</span>
                            </div>
                            <span className="text-red-400">→</span>
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-6 text-center">
                        FlavourFit respects your privacy. All data is encrypted and used only to improve your experience.
                        You have full control over your information.
                    </p>
                </motion.div>

                {/* Save Button */}
                <div className="flex justify-center pt-4">
                    <button
                        onClick={handleSave}
                        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-3"
                    >
                        <Save className="w-6 h-6" />
                        Save All Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
