import React from 'react';
import {useTranslation} from 'react-i18next';
import {useBiography} from '../hooks/useBiography';
import {useImages} from '../hooks/useImages';
import MarkdownRenderer from './MarkdownRenderer';
import ImageCarousel from './ImageCarousel';

const Biography = () => {
    const {t} = useTranslation();
    const {images, error: imgErr} = useImages();
    const {bioData, loading} = useBiography();

    if (loading) return <div>{t('loading')}</div>;
    if (!bioData) return <div className="error">{t('errors.biography_failed')}</div>;

    const {title, introduction, table_of_contents_title: tocTitle, table_of_contents: toc, chapters} = bioData;

    const renderCarousel = () => {
        if (imgErr) return <p className="error">{t('errors.images_failed')}</p>;
        if (!images.length) return <p>{t('no_images')}</p>;
        return <ImageCarousel images={images}/>;
    };

    return (
        <article className="page-container biography">
            <h1>{title}</h1>
            <p className="indented-text">{introduction}</p>

            {/* Images loop */}
            {renderCarousel()}

            {/* Table of Contents */}
            <nav id="toc" className="toc-container">
                <h3>{tocTitle}</h3>
                {toc?.length ? (
                    <ol>
                        {toc.map(({id, title}) => (
                            <li key={id}><a href={`#${id}`}>{title}</a></li>
                        ))}
                    </ol>
                ) : <p>{t('no_table_of_contents')}</p>}
            </nav>

            {/* Chapters */}
            {chapters?.length ? (
                chapters.map(({id, title, content}) => (
                    <section key={id} id={id}>
                        <h2>{title}</h2>
                        <div className="indented-text">
                            <MarkdownRenderer>{content}</MarkdownRenderer>
                        </div>

                    </section>
                ))
            ) : <p>{t('no_chapters')}</p>}
        </article>
    );
};

export default Biography;
