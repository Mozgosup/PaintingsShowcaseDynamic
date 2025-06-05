import React, { useState } from 'react';

function Artwork({ painting }) {
    const [loaded, setLoaded] = useState(false);

    const handleLoad = () => {
        setLoaded(true);
    };

    // Можно добавить onClick, если хотите открыть модалку:
    // const handleClick = () => openModal(painting);

    return (
        <figure className={`artwork ${loaded ? 'loaded' : ''}`}>
            <img
                src={painting.imageUrl}       // <-- подставить imageUrl, если JSON возвращает "imageUrl"
                alt={painting.alt || '...'}   // <-- если поле "alt" реально приходит из бэкенда
                loading="lazy"
                onLoad={handleLoad}
            />
            <figcaption>
                <p className="painting-name">{painting.name}</p>
                <p>Year: {painting.year}</p>
                {/* ...и т.д. если хотите показать height/width */}
            </figcaption>
        </figure>
    );
}

export default Artwork;
