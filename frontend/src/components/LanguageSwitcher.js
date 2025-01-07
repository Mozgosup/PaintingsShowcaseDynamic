import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    const switchToEN = () => i18n.changeLanguage('en');
    const switchToRU = () => i18n.changeLanguage('ru');

    return (
        <div className="lang-switcher">
            <button
                type="button"
                onClick={switchToEN}
                className={`lang-btn ${currentLang === 'en' ? 'active-lang' : ''}`}
            >
                <span>EN</span>
            </button>
            <button
                type="button"
                onClick={switchToRU}
                className={`lang-btn ${currentLang === 'ru' ? 'active-lang' : ''}`}
            >
                <span>RU</span>
            </button>
        </div>
    );
}

export default LanguageSwitcher;
