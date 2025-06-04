import React from 'react';
import Artwork from './Artwork';

function Gallery({ paintings }) {
    return (
        <div id="gallery">
            {paintings.map((painting, index) => (
                <Artwork key={index} painting={painting} />
            ))}
        </div>
    );
}

export default Gallery;
