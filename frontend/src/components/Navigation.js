import React from 'react';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';

function Navigation() {
    return (
        <>
            <nav id="menu">
                <ul>
                    <li id="menu-home" className="active-menu-item">
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
            <LanguageSwitcher />
        </>
    );
}

export default Navigation;
