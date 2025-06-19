import React, { useState } from 'react';

function Artwork({ painting, openModal }) {
    const [loaded, setLoaded] = useState(false);

    const handleLoad = () => setLoaded(true);
    const handleClick = () => openModal && openModal(painting);

    return (
        <figure
            className={`artwork ${loaded ? 'loaded' : ''}`}
            onClick={handleClick}
        >
            <img
                src={painting.imageUrl}
                alt={painting.alt || '...'}
                loading="lazy"
                onLoad={handleLoad}
            />
            <figcaption>
                <p className="painting-name">{painting.name}</p>
                <p>{painting.height}x{painting.width}, {painting.year}</p>
            </figcaption>
        </figure>
    );
}

export default Artwork;
