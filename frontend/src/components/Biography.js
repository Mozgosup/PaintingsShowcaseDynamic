import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Biography = () => {
    const { t } = useTranslation();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadImages = async () => {
            try {
                console.log('Fetching images...');
                const response = await fetch('/api/biography/images');
                if (!response.ok) {
                    throw new Error(`Failed to fetch images: ${response.statusText}`);
                }
                const data = await response.json();

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

    const title = t('bio.title');
    const introduction = t('bio.introduction');

    const tableOfContents = t('bio.table_of_contents', { returnObjects: true }) || [];
    const tableOfContentsTitle = t('bio.table_of_contents_title', 'Table of Contents');

    const chapters = t('bio.chapters', { returnObjects: true }) || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="biography">
            <h1>{title}</h1>
            <p>{introduction}</p>

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
            <h2>{tableOfContentsTitle}</h2>
            <ul>
                {Array.isArray(tableOfContents) && tableOfContents.length > 0 ? (
                    tableOfContents.map((entry, index) => (
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
                        {/* Paragraphs */}
                        {Array.isArray(chapter.paragraphs) && chapter.paragraphs.map((p, pIndex) => (
                            <p key={pIndex}>{p}</p>
                        ))}

                        {/* Links */}
                        {Array.isArray(chapter.links) && chapter.links.length > 0 && (
                            <>
                                <h3>{chapter.links_title || 'Links'}</h3>
                                <ul>
                                    {chapter.links.map((link, lIndex) => (
                                        <li key={lIndex}>
                                            <strong>{link.label}</strong> - {link.description} -{' '}
                                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                {link.url}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                ))
            ) : (
                <p>No chapters available</p>
            )}
        </div>
    );
};

export default Biography;
