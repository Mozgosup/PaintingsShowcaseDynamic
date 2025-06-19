import React from 'react';

function ImageModal({painting, onClose}) {
    if (!painting) return null;

    const handleBackgroundClick = () => onClose();
    const handleImageClick = (e) => e.stopPropagation();

    return (
        <div className="modal show" onClick={handleBackgroundClick}>
            <span className="close" onClick={onClose}>&times;</span>
            <div className="modal-content" onClick={handleImageClick}>
                <img
                    src={painting.imageUrl}
                    alt={painting.alt || painting.name}
                />
            </div>
            <div className="painting-info">
                <p>{painting.name}</p>
                <p>{painting.height}x{painting.width}, {painting.year}</p>
            </div>
        </div>
    );
}

export default ImageModal;
