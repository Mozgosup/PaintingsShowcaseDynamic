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
            <div style={{marginTop: '10px', border: '2px solid green'}}>
                <p style={{color: 'red'}}>Debug test image:</p>
                <img
                    src="https://paintingsbucket-mozgosup.s3.eu-north-1.amazonaws.com/paintings/7f97addb-c276-47ba-9f13-7429a08dcc9a-Roof_Tyutchevo.jpeg"
                    alt="debug test"
                    style={{border: '2px dashed red', display: 'block'}}
                />
            </div>
        </figure>
    );
}

export default Artwork;
