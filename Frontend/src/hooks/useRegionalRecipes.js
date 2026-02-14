import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://127.0.0.1:5000/api';

/**
 * Hook for fetching regional recipe heatmap data.
 * - Loads all state counts once on mount.
 * - Provides fetchState(code) for on-demand full recipe data.
 */
export function useRegionalRecipes() {
    const [counts, setCounts] = useState({});
    const [names, setNames] = useState({});
    const [loading, setLoading] = useState(true);
    const [stateData, setStateData] = useState(null);
    const [stateLoading, setStateLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load all counts once on mount
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${API_URL}/regions/popular/all`);
                const json = await res.json();
                setCounts(json.counts || {});
                setNames(json.names || {});
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Fetch full recipe list for a single state
    const fetchState = useCallback(async (stateCode) => {
        if (!stateCode) return;
        setStateLoading(true);
        setStateData(null);
        try {
            const res = await fetch(`${API_URL}/regions/popular?state=${stateCode}`);
            if (!res.ok) throw new Error(`State ${stateCode} not found`);
            const json = await res.json();
            setStateData(json);
        } catch (e) {
            setError(e.message);
        } finally {
            setStateLoading(false);
        }
    }, []);

    // Compute max count for color scaling
    const maxCount = Math.max(...Object.values(counts), 1);

    return { counts, names, maxCount, loading, stateData, stateLoading, fetchState, error };
}
