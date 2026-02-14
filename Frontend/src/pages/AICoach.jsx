import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Eye, Plus, Heart, Repeat } from 'lucide-react';

const AICoach = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'ai',
            content: "Hi Priya! 👋 I'm your AI Nutrition Coach. Ask me for meal ideas, substitutions, or health tips!",
            timestamp: new Date()
        },
        {
            id: 2,
            type: 'user',
            content: "Suggest a high-protein dinner under ₹100",
            timestamp: new Date()
        },
        {
            id: 3,
            type: 'ai',
            isCard: true,
            dish: {
                name: 'Paneer Bhurji + 2 Rotis',
                emoji: '🍽️',
                calories: 420,
                protein: 32,
                price: 65,
                reasoning: [
                    { label: 'Taste match', score: 82 },
                    { label: 'Weight loss friendly', score: 91 },
                    { label: 'Diabetic safe', score: 95 },
                    { label: 'Under ₹100 budget', score: 100, checkmark: true }
                ]
            },
            timestamp: new Date()
        },
        {
            id: 4,
            type: 'user',
            content: "Make it Jain",
            timestamp: new Date()
        }
    ]);

    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showReasoning, setShowReasoning] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const chatEndRef = useRef(null);

    const quickPrompts = [
        { emoji: '💪', text: 'High Protein' },
        { emoji: '💰', text: 'Budget Friendly' },
        { emoji: '❤️', text: 'Diabetic Safe' },
        { emoji: '🌶️', text: 'Spicy Dinner' },
        { emoji: '🕒', text: '15-min Recipes' },
        { emoji: '🥗', text: 'South Indian' }
    ];

    const userContext = {
        goal: 'Weight Loss',
        diet: 'Veg ✓',
        budget: '₹200/day'
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages([...messages, userMessage]);
        setInputValue('');

        // Simulate AI typing
        setIsTyping(true);
        setTimeout(() => {
            const aiMessage = {
                id: messages.length + 2,
                type: 'ai',
                content: "I've analyzed your request! Here's what I recommend based on your preferences and health goals.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 2000);
    };

    const handleQuickPrompt = (text) => {
        setInputValue(text);
    };

    const handleVoice = () => {
        setIsListening(true);
        setTimeout(() => {
            setInputValue("Suggest a high-protein dinner under ₹100");
            setIsListening(false);
        }, 1500);
    };

    const AIMessageCard = ({ dish }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-rose-500/20 to-rose-600/20 border border-rose-500/30 rounded-3xl p-6 shadow-lg max-w-lg"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{dish.emoji}</span>
                <div className="flex-1">
                    <h3 className="font-bold text-xl text-white">{dish.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-300 mt-1">
                        <span className="font-mono">{dish.calories}kcal</span>
                        <span>•</span>
                        <span className="font-mono">{dish.protein}g protein</span>
                        <span>•</span>
                        <span className="font-mono text-green-400 font-bold">₹{dish.price}</span>
                    </div>
                </div>
            </div>

            {/* Reasoning */}
            <div className="bg-slate-700/50 rounded-2xl p-4 mb-4">
                <h4 className="font-bold text-sm text-gray-300 mb-3 flex items-center gap-2">
                    🧠 WHY THIS WORKS:
                </h4>
                <div className="space-y-2">
                    {dish.reasoning.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">• {item.label}</span>
                            <div className="flex items-center gap-2">
                                {item.checkmark ? (
                                    <span className="text-emerald-600 font-bold">✓</span>
                                ) : (
                                    <span className="text-sm font-mono font-bold text-violet-400">
                                        {item.score}%
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button className="flex-1 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-rose-500/50 transition-all flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add to Plan
                </button>
                <button className="px-4 py-2.5 bg-slate-700/50 border-2 border-slate-600 rounded-xl hover:border-rose-400 transition-colors">
                    <Heart className="w-5 h-5 text-gray-300 hover:text-rose-400" />
                </button>
                <button className="px-4 py-2.5 bg-slate-700/50 border-2 border-slate-600 rounded-xl hover:border-violet-400 transition-colors">
                    <Repeat className="w-5 h-5 text-gray-300 hover:text-violet-400" />
                </button>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
            {/* Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 px-8 py-6 shadow-sm">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
                            🤖 AI Nutrition Coach
                        </h1>
                        <p className="text-gray-300 mt-1">Ask me anything about food & health</p>
                    </div>

                    {/* Context Panel */}
                    <div className="flex items-center gap-4 bg-violet-500/20 border border-violet-500/30 px-6 py-3 rounded-2xl">
                        <Eye className="w-5 h-5 text-violet-400" />
                        <div className="flex items-center gap-3 text-sm">
                            <span className="font-semibold text-white">Goal: {userContext.goal}</span>
                            <span className="text-gray-500">|</span>
                            <span className="text-gray-300">{userContext.diet}</span>
                            <span className="text-gray-500">|</span>
                            <span className="text-gray-300">{userContext.budget}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    <AnimatePresence>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.type === 'ai' && (
                                    <div className="flex gap-3 max-w-3xl">
                                        <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                                            <span className="text-xl">🤖</span>
                                        </div>
                                        <div>
                                            {message.isCard ? (
                                                <AIMessageCard dish={message.dish} />
                                            ) : (
                                                <div className="bg-slate-700/50 border border-slate-600 rounded-3xl rounded-tl-sm px-6 py-4 shadow-md">
                                                    <p className="text-gray-200 leading-relaxed">{message.content}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {message.type === 'user' && (
                                    <div className="flex gap-3 max-w-2xl">
                                        <div className="bg-gradient-to-br from-violet-600/20 to-violet-800/20 border border-violet-500/30 rounded-3xl rounded-tr-sm px-6 py-4 shadow-md">
                                            <p className="text-white leading-relaxed">{message.content}</p>
                                        </div>
                                        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                                            <span className="text-xl">👩</span>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex gap-3"
                        >
                            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                                <span className="text-xl">🤖</span>
                            </div>
                            <div className="bg-white rounded-3xl rounded-tl-sm px-6 py-4 shadow-md border border-gray-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    <span className="ml-2 text-sm text-gray-500">AI optimizing for your taste...</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Quick Prompts */}
            <div className="bg-slate-800/50 border-t border-slate-700 px-8 py-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {quickPrompts.map((prompt, index) => (
                            <button
                                key={index}
                                onClick={() => handleQuickPrompt(prompt.text)}
                                className="px-4 py-2 bg-violet-500/10 border-2 border-violet-500/20 rounded-full text-sm font-semibold text-gray-200 hover:border-violet-400 hover:bg-violet-500/20 hover:shadow-md transition-all whitespace-nowrap flex items-center gap-2"
                            >
                                <span>{prompt.emoji}</span>
                                <span>{prompt.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Input Bar */}
            <div className="bg-slate-800/50 border-t-2 border-slate-700 px-8 py-6 shadow-lg">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4">
                        {/* Voice Button */}
                        <button
                            onClick={handleVoice}
                            className={`p-4 rounded-2xl transition-all ${isListening
                                ? 'bg-rose-500 text-white animate-pulse'
                                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                                }`}
                        >
                            <Mic className="w-6 h-6" />
                        </button>

                        {/* Input Field */}
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your question..."
                                className="w-full px-6 py-4 bg-slate-700/50 border border-slate-600 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                            />
                        </div>

                        {/* Send Button */}
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className="p-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-2xl hover:shadow-lg hover:shadow-rose-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Toggle Reasoning */}
                    <div className="flex items-center justify-between mt-4">
                        <button
                            onClick={() => setShowReasoning(!showReasoning)}
                            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                        >
                            <div className={`w-10 h-6 rounded-full transition-colors ${showReasoning ? 'bg-emerald-500' : 'bg-gray-600'} relative`}>
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${showReasoning ? 'translate-x-5' : 'translate-x-1'}`}></div>
                            </div>
                            <span className="font-semibold">🔍 Explain Reasoning</span>
                            <span className={`font-bold ${showReasoning ? 'text-emerald-400' : 'text-gray-500'}`}>
                                {showReasoning ? 'ON' : 'OFF'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AICoach;
