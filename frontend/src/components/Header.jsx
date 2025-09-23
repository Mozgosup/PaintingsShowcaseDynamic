import React from 'react';
import {useTranslation} from "react-i18next";

function Header() {

    const {t} = useTranslation();

    return (
        <header id="site-header">
            <div className="header-text">{t('header.title')}</div>
        </header>
    );
}

export default Header;
