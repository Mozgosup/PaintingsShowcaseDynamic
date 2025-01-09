import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Mousewheel} from 'swiper/modules';
import 'swiper/css';

const Biography = () => {
    const {t} = useTranslation();
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

    const tableOfContents = t('bio.table_of_contents', {returnObjects: true}) || [];
    const tableOfContentsTitle = t('bio.table_of_contents_title', 'Table of Contents');

    const chapters = t('bio.chapters', {returnObjects: true}) || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="biography">
            <h1>{title}</h1>
            <p>{introduction}</p>

            {/* Images loop */}
            {images.length > 0 ? (
                <Swiper
                    modules={[Mousewheel]}
                    loop={true}
                    mousewheel={true}
                    grabCursor={true}
                    spaceBetween={10}
                    slidesPerGroup={1}
                    loopAdditionalSlides={3}
                    slidesPerView="auto"
                    style={{width: '100%', height: '400px'}}
                >
                    {images.map((img, index) => (
                        <SwiperSlide
                            key={index}
                            style={{
                                width: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <img
                                src={img.url}
                                alt={img.alt || `Image ${index + 1}`}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
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
