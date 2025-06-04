import React, { useEffect, useState } from 'react';
import Gallery from './Gallery';

function MainContent() {
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        fetch('/api/paintings')
            .then(res => res.json())
            .then(data => setPaintings(data))
            .catch(err => console.error('Error:', err));
    }, []);

    return (
        <div>
            <h1>Featured Artworks</h1>
            <Gallery paintings={paintings} />
        </div>
    );
}

export default MainContent;
