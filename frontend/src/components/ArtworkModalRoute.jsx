import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

export default function ArtworkModalRoute() {
    const {slug} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const {i18n} = useTranslation();
    const [painting, setPainting] = useState(null);
    const [error, setError] = useState(null);
    const closedByCode = useRef(false);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setError(null);
                const langParam = i18n.language.slice(0, 2).toUpperCase();
                const res = await fetch(`/api/paintings/slug/${encodeURIComponent(slug)}?language=${langParam}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                if (!cancelled) setPainting(json);
            } catch (e) {
                if (!cancelled) setError(e);
            }
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [slug, i18n.language]);

    const close = () => {
        closedByCode.current = true;
        const bg = location.state?.backgroundLocation;
        const targetPath = bg?.pathname ?? '/';
        navigate(targetPath, {replace: true});

        queueMicrotask(() => {
            const el = document.getElementById(`art-${slug}`);
            if (el && typeof el.scrollIntoView === 'function') {
                el.scrollIntoView({block: 'center', inline: 'center', behavior: 'smooth'});
            }
        });
    };

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                close();
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    if (error) {
        return (
            <div className="modal show" onClick={close}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <p>Artwork not found.</p>
                    <button onClick={close}>Close</button>
                </div>
            </div>
        );
    }

    if (!painting) return null;

    return (
        <div className="modal show" onClick={close}>
            <span className="close" onClick={close}>&times;</span>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img src={painting.imageUrl} alt={painting.name}/>
            </div>
            <div className="painting-info">
                <p>{painting.name}</p>
                <p>{painting.height}x{painting.width}, {painting.year}</p>
            </div>
        </div>
    );
}
