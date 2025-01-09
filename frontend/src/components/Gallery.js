import React, { useState } from 'react';
import Artwork from './Artwork';
import ImageModal from './ImageModal';

function Gallery({ paintings }) {
    const [selectedPainting, setSelectedPainting] = useState(null);

    const openModal = (painting) => setSelectedPainting(painting);
    const closeModal = () => setSelectedPainting(null);

    return (
        <div>
            <div id="gallery">
                {paintings.map((p, i) => (
                    <Artwork key={i} painting={p} openModal={openModal} />
                ))}
            </div>
            <ImageModal painting={selectedPainting} onClose={closeModal} />
        </div>
    );
}

export default Gallery;
