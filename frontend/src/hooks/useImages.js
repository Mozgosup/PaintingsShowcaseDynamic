import {useEffect, useState} from 'react';

export const useImages = () => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        (async () => {
            try {
                const res = await fetch('/api/biography/images', {signal: controller.signal});
                if (!res.ok) throw new Error(res.statusText);
                const data = await res.json();
                if (Array.isArray(data)) setImages(data);
                else throw new Error('Invalid image data');
            } catch (err) {
                if (err.name !== 'AbortError') setError(err);
            }
        })();

        return () => controller.abort();
    }, []);

    return {images, error};
};
