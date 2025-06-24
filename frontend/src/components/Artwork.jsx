import React, {useState} from 'react';

function Artwork({painting, openModal}) {
    const [loaded, setLoaded] = useState(false);

    const handleLoad = () => setLoaded(true);
    const handleClick = () => openModal && openModal(painting);

    const size =
        painting.height && painting.width ? `${painting.height}×${painting.width}` : '';
    const meta = [size, painting.year].filter(Boolean).join(', ');

    return (
        <figure className={`artwork ${loaded ? 'loaded' : ''}`} onClick={handleClick}>
            <img
                src={painting.imageUrl}
                alt={painting.name || 'Artwork'}
                loading="lazy"
                onLoad={handleLoad}
            />
            <figcaption>
                <p className="painting-name">{painting.name || 'Untitled'}</p>
                {meta && <p>{meta}</p>}
            </figcaption>
        </figure>
    );
}

export default Artwork;
