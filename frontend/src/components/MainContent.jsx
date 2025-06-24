import React from 'react';
import Gallery from './Gallery';
import { useTranslation } from "react-i18next";

function MainContent() {
    const { t } = useTranslation();
    return (
        <div className="page-container">
            <h1 className="gallery-title">{t('main.featured_artworks')}</h1>
            <Gallery />
        </div>
    );
}

export default MainContent;
