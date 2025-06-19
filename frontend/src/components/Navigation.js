import React from 'react';
import { NavLink  } from 'react-router-dom';

function Navigation() {

    const getActiveClass = ({ isActive }) => (isActive ? 'active-menu-item' : undefined);

    return (
        <nav id="menu">
            <ul>
                <li id="menu-home">
                    <NavLink to="/" className={getActiveClass}>Artworks</NavLink>
                </li>
                <li id="menu-about">
                    <NavLink to="/about" className={getActiveClass}>About Lidia</NavLink>
                </li>
                <li id="menu-contact">
                    <NavLink to="/contact" className={getActiveClass}>Contact</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
