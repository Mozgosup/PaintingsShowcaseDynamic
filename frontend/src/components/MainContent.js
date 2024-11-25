import React from 'react';
import Gallery from './Gallery';
import Biography from './Biography';
import Contact from './Contact';

function MainContent() {
    return (
        <div id="content">
            <section id="home" className="content-section">
                <h1>Featured Artworks</h1>
                <Gallery />
            </section>
            <section id="about" className="content-section hidden">
                <h1>About Lidia</h1>
                <Biography />
            </section>
            <section id="contact" className="content-section hidden">
                <Contact />
            </section>
        </div>
    );
}

export default MainContent;
