import { useState, useEffect } from 'react';
import { getPersonalizedRecipes, getRecipesByHealth } from '../data/regionalRecipes';

export const useFlavorAI = () => {
    const [userLocation, setUserLocation] = useState('DL');
    const [healthGoal, setHealthGoal] = useState('balanced');
    const [tastePreference, setTastePreference] = useState('spicy');
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);

    // Mock geolocation detection
    useEffect(() => {
        // Simulate geo-detection
        const detectLocation = () => {
            // In production, use navigator.geolocation
            const mockLocations = ['DL', 'MH', 'KA', 'TN', 'WB'];
            const detected = mockLocations[Math.floor(Math.random() * mockLocations.length)];
            setUserLocation(detected);
        };

        detectLocation();
    }, []);

    // Get personalized recommendations
    const getRecommendations = () => {
        setLoading(true);
        setTimeout(() => {
            const personalized = getPersonalizedRecipes({
                location: userLocation,
                healthGoal,
                tastePreference
            });
            setRecommendations(personalized.slice(0, 10));
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        getRecommendations();
    }, [userLocation, healthGoal, tastePreference]);

    // Voice search simulation
    const voiceSearch = (query) => {
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('high protein')) {
            return getRecipesByHealth('high-protein');
        } else if (lowerQuery.includes('diabetic') || lowerQuery.includes('diabetes')) {
            return getRecipesByHealth('diabetic');
        } else if (lowerQuery.includes('low carb')) {
            return getRecipesByHealth('low-carb');
        }

        return recommendations;
    };

    // Calculate taste vector similarity (mock)
    const calculateTasteSimilarity = (recipe1, recipe2) => {
        const v1 = Object.values(recipe1.flavorProfile);
        const v2 = Object.values(recipe2.flavorProfile);

        // Cosine similarity
        const dotProduct = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
        const mag1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0));
        const mag2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));

        return dotProduct / (mag1 * mag2);
    };

    return {
        userLocation,
        setUserLocation,
        healthGoal,
        setHealthGoal,
        tastePreference,
        setTastePreference,
        recommendations,
        loading,
        voiceSearch,
        calculateTasteSimilarity,
        refreshRecommendations: getRecommendations
    };
};
