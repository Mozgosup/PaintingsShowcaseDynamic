import React from 'react';
import {useTranslation} from "react-i18next";

function Footer() {

    const {t} = useTranslation();

    return (
        <footer id="site-footer">
            <div className="footer-text">{t('footer.text', {year: new Date().getFullYear()})}</div>
        </footer>
    );
}

export default Footer;
