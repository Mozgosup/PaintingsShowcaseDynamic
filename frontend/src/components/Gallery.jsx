import React, { useState } from 'react';
import Artwork from './Artwork';
import ImageModal from './ImageModal';
import { usePaintings } from '../hooks/usePaintings';

function Gallery() {
    const [selectedPainting, setSelectedPainting] = useState(null);
    const { data: paintings, loading, error } = usePaintings();

    const openModal = (painting) => setSelectedPainting(painting);
    const closeModal = () => setSelectedPainting(null);

    if (loading) return <div>Loading…</div>;
    if (error)   return <div>Failed to load</div>;
    if (!paintings?.length) return <div>No paintings yet</div>;

    return (
        <div>
            <div id="gallery">
                {paintings.map((p) => (
                    <Artwork key={p.id} painting={p} openModal={openModal} />
                ))}
            </div>
            <ImageModal painting={selectedPainting} onClose={closeModal} />
        </div>
    );
}

export default Gallery;
