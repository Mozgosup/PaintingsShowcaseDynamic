import React from 'react';
import {useTranslation} from "react-i18next";

function Contact() {
    const {t} = useTranslation();

    return (
        <div className="page-container contact-section">
            <h1>{t('contact.title')}</h1>
            <p className="contact-intro">{t('contact.intro')}</p>
            <dl className="contact-list">
                <dt>{t('contact.facebook')}:</dt>
                <dd>
                    <a
                        href="https://www.facebook.com/lidia.skargina"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Lidia Skargina
                    </a>
                </dd>

                <dt>{t('contact.phone')}:</dt>
                <dd>+1234567890</dd>

                <dt>{t('contact.email')}:</dt>
                <dd>
                    <a href="mailto:lskargina@list.ru">lskargina@list.ru</a>
                </dd>
            </dl>
        </div>
    );
}

export default Contact;
