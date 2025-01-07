import React from 'react';
import Gallery from './Gallery';

function MainContent() {
    return (
        <div id="content">
            <section id="home" className="content-section">
                <h1>Featured Artworks</h1>
                <Gallery />
            </section>
        </div>
    );
}

export default MainContent;
