import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

const isProd = process.env.NODE_ENV === 'production';

export const useBiography = () => {
    const {i18n} = useTranslation();
    const [bioData, setBioData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBiography = async () => {
            try {
                const lang = i18n.language || 'en';
                const response = await fetch(
                    isProd
                        ? `https://paintingsbucket-mozgosup.s3.eu-north-1.amazonaws.com/biography/text/${lang}/biography.json`
                        : `/locales/${lang}/biography.json`
                );
                const json = await response.json();
                setBioData(json.bio);
            } catch (error) {
                console.error('Failed to load biography JSON:', error);
                setBioData(null);
            } finally {
                setLoading(false);
            }
        };

        loadBiography();
    }, [i18n.language]);

    return {bioData, loading};
};
