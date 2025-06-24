import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

export function usePaintings() {
    const {i18n} = useTranslation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const langParam = i18n.language.slice(0, 2).toUpperCase();
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`/api/paintings?language=${langParam}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                if (!cancelled) setData(json);
            } catch (e) {
                if (!cancelled) setError(e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [i18n.language]);

    return {data, loading, error};
}
