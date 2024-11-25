import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_URL } from '../config';

const Biography = () => {
    const { t } = useTranslation();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            try {
                console.log('Fetching images...');
                const response = await fetch(`${API_URL}/api/biography/images`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch images: ${response.statusText}`);
                }
                const data = await response.json();

                // Validate response structure
                if (Array.isArray(data)) {
                    setImages(data);
                } else {
                    console.error('Expected array for images, but got:', data);
                }
            } catch (error) {
                console.error('Error loading images:', error);
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, []);

    const tocEntries = t('bio.table_of_contents', { returnObjects: true }) || [];
    const chapters = t('bio.chapters', { returnObjects: true }) || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="biography">
            <h1>{t('bio.title', 'Biography')}</h1>
            <p>{t('bio.introduction')}</p>

            {/* Images gallery */}
            {images.length > 0 ? (
                <div className="images-gallery">
                    {images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.alt || `Image ${index + 1}`} />
                    ))}
                </div>
            ) : (
                <p>No images available</p>
            )}

            {/* Table of Contents */}
            <h2>{t('bio.table_of_contents.title', 'Table of Contents')}</h2>
            <ul>
                {Array.isArray(tocEntries) && tocEntries.length > 0 ? (
                    tocEntries.map((entry, index) => (
                        <li key={index}>
                            <a href={`#${entry.id}`}>{entry.title}</a>
                        </li>
                    ))
                ) : (
                    <li>No table of contents available</li>
                )}
            </ul>

            {/* Chapters */}
            {Array.isArray(chapters) && chapters.length > 0 ? (
                chapters.map((chapter, index) => (
                    <div key={index} id={chapter.id}>
                        <h2>{chapter.title}</h2>
                        {Array.isArray(chapter.content) &&
                            chapter.content.map((paragraph, pIndex) => (
                                <p key={pIndex}>{paragraph}</p>
                            ))}
                    </div>
                ))
            ) : (
                <p>No chapters available</p>
            )}

            {/* Links */}
            {Array.isArray(chapters) && chapters.some(ch => ch.id === 'chapter3') && (
                <div>
                    <h2>{chapters.find(ch => ch.id === 'chapter3').title}</h2>
                    <ul>
                        {chapters
                            .find(ch => ch.id === 'chapter3')
                            .content.map((link, index) => (
                                <li key={index}>
                                    <strong>{link.label}</strong> - {link.description} -{' '}
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.url}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Biography;
