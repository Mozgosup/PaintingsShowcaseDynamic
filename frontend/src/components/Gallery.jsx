import React from 'react';
import {useTranslation} from 'react-i18next';
import Artwork from './Artwork';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {usePaintings} from '../hooks/usePaintings';

function Gallery() {
    const {data: paintings, loading, error} = usePaintings();
    const location = useLocation();
    const {t} = useTranslation();

    if (loading) return <div>Loading…</div>;
    if (error) return <div>Failed to load</div>;
    if (!paintings?.length) return <div>No paintings yet</div>;

    return (
        <div className="page-container">
            <h1 className="gallery-title">{t('main.featured_artworks')}</h1>

            <div id="gallery">
                {paintings.map((p) => (
                    <Link
                        key={p.id}
                        to={`/${p.slug}`}
                        state={{backgroundLocation: location, fromSlug: p.slug}}
                        id={`art-${p.slug}`}
                        className="artwork-link"
                        title={p.name}
                        style={{textDecoration: 'none', color: 'inherit'}}
                    >
                        <Artwork painting={p}/>
                    </Link>
                ))}
            </div>

            <Outlet/>
        </div>
    );
}

export default Gallery;
