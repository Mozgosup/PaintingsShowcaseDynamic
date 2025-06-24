import React from 'react';
import {NavLink} from 'react-router-dom';
import {useTranslation} from "react-i18next";

function Navigation() {

    const getActiveClass = ({isActive}) => (isActive ? 'active-menu-item' : undefined);
    const {t} = useTranslation();

    return (
        <nav id="menu">
            <ul>
                <li id="menu-home">
                    <NavLink to="/" className={getActiveClass}>{t('nav.artworks')}</NavLink>
                </li>
                <li id="menu-about">
                    <NavLink to="/about" className={getActiveClass}>{t('nav.about')}</NavLink>
                </li>
                <li id="menu-contact">
                    <NavLink to="/contact" className={getActiveClass}>{t('nav.contact')}</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;
