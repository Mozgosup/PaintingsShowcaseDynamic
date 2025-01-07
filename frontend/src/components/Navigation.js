import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav id="menu">
            <ul>
                <li id="menu-home">
                    <Link to="/">Artworks</Link>
                </li>
                <li id="menu-about">
                    <Link to="/about">About Lidia</Link>
                </li>
                <li id="menu-contact">
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
