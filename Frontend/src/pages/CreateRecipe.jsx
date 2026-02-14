import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Plus, Minus, Flame, Sparkles, AlertTriangle, IndianRupee, Send, Loader2 } from 'lucide-react';

const CUISINE_OPTIONS = [
    'North Indian', 'South Indian', 'Mughlai', 'Gujarati', 'Rajasthani',
    'Bengali', 'Punjabi', 'Kerala', 'Goan', 'Street Food', 'Continental', 'Chinese', 'Other'
];

const REGION_OPTIONS = [
    'Maharashtra', 'Gujarat', 'Rajasthan', 'Punjab', 'Tamil Nadu',
    'Kerala', 'Karnataka', 'Telangana', 'West Bengal', 'Goa',
    'Delhi', 'Uttar Pradesh', 'Bihar', 'Madhya Pradesh', 'Other'
];

const HEALTH_TAG_OPTIONS = [
    'high-protein', 'low-carb', 'diabetic-friendly', 'heart-healthy',
    'low-calorie', 'gluten-free', 'budget-friendly', 'traditional'
];

const API_URL = 'http://127.0.0.1:5000/api';

const CreateRecipe = () => {
    const [form, setForm] = useState({
        title: '',
        cuisine: '',
        region: '',
        diet_type: 'veg',
        spice_level: 3,
        budget_tier: '₹₹',
        health_tags: [],
    });

    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [steps, setSteps] = useState(['']);
    const [publishing, setPublishing] = useState(false);
    const [published, setPublished] = useState(null);
    const [error, setError] = useState('');

    // AI Assist: estimate nutrition live
    const aiPreview = useMemo(() => {
        const validIngredients = ingredients.filter(i => i.name.trim());
        if (validIngredients.length === 0) return null;

        // Simple client-side heuristics for live preview
        const ROUGH_CAL = { rice: 130, chicken: 240, potato: 77, paneer: 265, dal: 116, oil: 884, butter: 717, tomato: 18, onion: 40, sugar: 387, egg: 155, fish: 206, milk: 42, wheat: 340, cream: 340, cheese: 402 };
        let totalCal = 0, totalProtein = 0;
        for (const ing of validIngredients) {
            const key = ing.name.toLowerCase().trim();
            let matched = false;
            for (const [known, cal] of Object.entries(ROUGH_CAL)) {
                if (key.includes(known) || known.includes(key)) {
                    totalCal += cal;
                    totalProtein += known === 'chicken' ? 27 : known === 'paneer' ? 18 : known === 'dal' ? 9 : known === 'egg' ? 13 : known === 'fish' ? 22 : 2;
                    matched = true;
                    break;
                }
            }
            if (!matched) { totalCal += 80; totalProtein += 2; }
        }

        const costMap = { '₹': 8, '₹₹': 15, '₹₹₹': 25 };
        const cost = (costMap[form.budget_tier] || 15) * validIngredients.length / 2;

        const warnings = [];
        if (totalCal / 2 > 600) warnings.push('High calorie dish');
        if (form.spice_level >= 4) warnings.push('Very spicy');

        return {
            calories: Math.round(totalCal / 2),
            protein: Math.round(totalProtein / 2),
            cost: Math.round(cost),
            count: validIngredients.length,
            warnings,
        };
    }, [ingredients, form.budget_tier, form.spice_level]);

    const addIngredient = () => setIngredients([...ingredients, { name: '', quantity: '' }]);
    const removeIngredient = (idx) => setIngredients(ingredients.filter((_, i) => i !== idx));
    const updateIngredient = (idx, field, value) => {
        const updated = [...ingredients];
        updated[idx] = { ...updated[idx], [field]: value };
        setIngredients(updated);
    };

    const addStep = () => setSteps([...steps, '']);
    const removeStep = (idx) => setSteps(steps.filter((_, i) => i !== idx));
    const updateStep = (idx, value) => {
        const updated = [...steps];
        updated[idx] = value;
        setSteps(updated);
    };

    const toggleTag = (tag) => {
        setForm(prev => ({
            ...prev,
            health_tags: prev.health_tags.includes(tag)
                ? prev.health_tags.filter(t => t !== tag)
                : [...prev.health_tags, tag]
        }));
    };

    const handlePublish = async () => {
        if (!form.title.trim()) { setError('Recipe name is required'); return; }
        if (!ingredients.some(i => i.name.trim())) { setError('Add at least one ingredient'); return; }
        if (!steps.some(s => s.trim())) { setError('Add at least one step'); return; }

        setError('');
        setPublishing(true);
        try {
            const payload = {
                ...form,
                author_id: 'user_' + Date.now(),
                author_name: 'You',
                ingredients: ingredients.filter(i => i.name.trim()),
                steps: steps.filter(s => s.trim()),
            };

            const res = await fetch(`${API_URL}/community/recipes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (res.ok) {
                setPublished(data.recipe);
            } else {
                setError(data.error || 'Failed to publish');
            }
        } catch (e) {
            setError('Cannot connect to server. Is the backend running?');
        }
        setPublishing(false);
    };

    if (published) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <div className="text-8xl mb-6">🎉</div>
                    <h2 className="text-4xl font-bold text-white mb-4">Recipe Published!</h2>
                    <p className="text-gray-400 text-lg mb-8">
                        <span className="text-emerald-400 font-semibold">"{published.title}"</span> is now live with AI-generated flavor analysis
                    </p>

                    <div className="glass rounded-2xl p-6 mb-6 text-left" style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2">
                            <Sparkles className="w-5 h-5" /> AI Analysis
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span className="text-gray-400">Calories:</span> <span className="text-white font-bold">{published.estimated_nutrition?.calories}</span></div>
                            <div><span className="text-gray-400">Protein:</span> <span className="text-white font-bold">{published.estimated_nutrition?.protein}g</span></div>
                            <div><span className="text-gray-400">Cost/serving:</span> <span className="text-white font-bold">₹{published.estimated_cost}</span></div>
                            <div><span className="text-gray-400">Flavor:</span> <span className="text-white font-bold">[{published.flavor_profile?.map(v => v.toFixed(2)).join(', ')}]</span></div>
                        </div>
                    </div>

                    <button
                        onClick={() => { setPublished(null); setForm({ title: '', cuisine: '', region: '', diet_type: 'veg', spice_level: 3, budget_tier: '₹₹', health_tags: [] }); setIngredients([{ name: '', quantity: '' }]); setSteps(['']); }}
                        className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-lg transition-all mr-4"
                    >
                        Create Another
                    </button>
                    <button
                        onClick={() => window.location.href = '/community'}
                        className="px-8 py-3 rounded-xl font-bold text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/10 transition-all"
                    >
                        View Community Feed →
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-4xl font-bold text-white flex items-center gap-3">
                        <span className="text-4xl">🍳</span> Share Your Recipe
                    </h1>
                    <p className="text-gray-400 mt-2">Add your dish and let AI do the rest</p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Form */}
                    <div className="flex-1 space-y-6">

                        {/* Section 1: Basic Info */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="rounded-2xl p-6" style={{ background: 'rgba(22, 27, 34, 0.8)', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
                            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                                <ChefHat className="w-5 h-5 text-violet-400" /> Basic Info
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">Recipe Name *</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        placeholder="e.g. Mumbai Street Pav Bhaji"
                                        className="input-field"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-gray-400 mb-1 block">Cuisine</label>
                                        <select
                                            value={form.cuisine}
                                            onChange={(e) => setForm({ ...form, cuisine: e.target.value })}
                                            className="input-field"
                                        >
                                            <option value="">Select cuisine</option>
                                            {CUISINE_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-400 mb-1 block">Region</label>
                                        <select
                                            value={form.region}
                                            onChange={(e) => setForm({ ...form, region: e.target.value })}
                                            className="input-field"
                                        >
                                            <option value="">Select region</option>
                                            {REGION_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* Diet Type */}
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">Diet Type</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {['veg', 'vegan', 'jain', 'non-veg'].map(diet => (
                                            <button
                                                key={diet}
                                                onClick={() => setForm({ ...form, diet_type: diet })}
                                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${form.diet_type === diet
                                                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg'
                                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                                    }`}
                                            >
                                                {diet === 'veg' ? '🟢' : diet === 'vegan' ? '🌱' : diet === 'jain' ? '☸️' : '🔴'} {diet}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Spice Level */}
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">
                                        Spice Level: {'🌶️'.repeat(form.spice_level)}
                                    </label>
                                    <input
                                        type="range" min={1} max={5} value={form.spice_level}
                                        onChange={(e) => setForm({ ...form, spice_level: parseInt(e.target.value) })}
                                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                                        style={{ background: `linear-gradient(to right, #10B981, #F59E0B ${(form.spice_level / 5) * 100}%, #EF4444)` }}
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Mild</span><span>Medium</span><span>🔥 Fire</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Section 2: Ingredients */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="rounded-2xl p-6" style={{ background: 'rgba(22, 27, 34, 0.8)', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
                            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                🥘 Ingredients
                            </h2>
                            <p className="text-xs text-gray-500 mb-4 flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-violet-400" /> Nutrition & cost will be calculated automatically
                            </p>

                            <div className="space-y-3">
                                {ingredients.map((ing, idx) => (
                                    <div key={idx} className="flex gap-3 items-center">
                                        <input
                                            type="text"
                                            value={ing.name}
                                            onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                                            placeholder="Ingredient name"
                                            className="input-field flex-1"
                                        />
                                        <input
                                            type="text"
                                            value={ing.quantity}
                                            onChange={(e) => updateIngredient(idx, 'quantity', e.target.value)}
                                            placeholder="Quantity"
                                            className="input-field w-36"
                                        />
                                        {ingredients.length > 1 && (
                                            <button onClick={() => removeIngredient(idx)}
                                                className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors">
                                                <Minus className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button onClick={addIngredient}
                                className="mt-3 flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                                <Plus className="w-4 h-4" /> Add Ingredient
                            </button>
                        </motion.div>

                        {/* Section 3: Steps */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            className="rounded-2xl p-6" style={{ background: 'rgba(22, 27, 34, 0.8)', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                📝 Cooking Steps
                            </h2>

                            <div className="space-y-3">
                                {steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-3 items-start">
                                        <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 font-bold text-sm shrink-0 mt-2">
                                            {idx + 1}
                                        </div>
                                        <textarea
                                            value={step}
                                            onChange={(e) => updateStep(idx, e.target.value)}
                                            placeholder={`Step ${idx + 1}...`}
                                            className="input-field flex-1 min-h-[60px] resize-none"
                                            rows={2}
                                        />
                                        {steps.length > 1 && (
                                            <button onClick={() => removeStep(idx)}
                                                className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors mt-2">
                                                <Minus className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button onClick={addStep}
                                className="mt-3 flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
                                <Plus className="w-4 h-4" /> Add Step
                            </button>
                        </motion.div>

                        {/* Section 4: Tags & Budget */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                            className="rounded-2xl p-6" style={{ background: 'rgba(22, 27, 34, 0.8)', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                🏷️ Tags & Budget
                            </h2>

                            <div className="mb-5">
                                <label className="text-sm text-gray-400 mb-2 block">Health Tags</label>
                                <div className="flex flex-wrap gap-2">
                                    {HEALTH_TAG_OPTIONS.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${form.health_tags.includes(tag)
                                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">Budget Range</label>
                                <div className="flex gap-3">
                                    {['₹', '₹₹', '₹₹₹'].map(tier => (
                                        <button
                                            key={tier}
                                            onClick={() => setForm({ ...form, budget_tier: tier })}
                                            className={`flex-1 py-3 rounded-xl text-center font-bold transition-all ${form.budget_tier === tier
                                                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg'
                                                : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                                }`}
                                        >
                                            {tier}
                                            <div className="text-xs font-normal mt-0.5 opacity-70">
                                                {tier === '₹' ? 'Budget' : tier === '₹₹' ? 'Moderate' : 'Premium'}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Error & Publish */}
                        <AnimatePresence>
                            {error && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handlePublish}
                            disabled={publishing}
                            className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {publishing ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Publishing...</>
                            ) : (
                                <><Send className="w-5 h-5" /> Publish Recipe</>
                            )}
                        </motion.button>
                    </div>

                    {/* Right: AI Assist Panel */}
                    <div className="lg:w-80">
                        <div className="sticky top-24">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="rounded-2xl p-6"
                                style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)' }}
                            >
                                <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" /> AI Preview
                                </h3>

                                {aiPreview ? (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white/5 rounded-xl p-3 text-center">
                                                <Flame className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                                                <div className="text-2xl font-bold text-white">{aiPreview.calories}</div>
                                                <div className="text-xs text-gray-400">Calories</div>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-3 text-center">
                                                <div className="text-2xl mb-1">💪</div>
                                                <div className="text-2xl font-bold text-white">{aiPreview.protein}g</div>
                                                <div className="text-xs text-gray-400">Protein</div>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-3 text-center">
                                                <IndianRupee className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                                                <div className="text-2xl font-bold text-white">₹{aiPreview.cost}</div>
                                                <div className="text-xs text-gray-400">Per Serving</div>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-3 text-center">
                                                <div className="text-2xl mb-1">🥘</div>
                                                <div className="text-2xl font-bold text-white">{aiPreview.count}</div>
                                                <div className="text-xs text-gray-400">Ingredients</div>
                                            </div>
                                        </div>

                                        {aiPreview.warnings.length > 0 && (
                                            <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/20">
                                                <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-1">
                                                    <AlertTriangle className="w-4 h-4" /> Health Notes
                                                </div>
                                                {aiPreview.warnings.map((w, i) => (
                                                    <p key={i} className="text-xs text-amber-300/80 ml-6">• {w}</p>
                                                ))}
                                            </div>
                                        )}

                                        <p className="text-xs text-gray-500 text-center italic">
                                            AI-generated preview — final values calculated on publish
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-3 opacity-40">🤖</div>
                                        <p className="text-sm text-gray-500">Add ingredients to see<br />AI nutrition estimates</p>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRecipe;
