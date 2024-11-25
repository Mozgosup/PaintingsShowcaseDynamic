import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        backend: {
            loadPath: 'https://paintingsbucket-mozgosup.s3.eu-north-1.amazonaws.com/biography/text/{{lng}}/biography.json',
        },
        interpolation: {
            escapeValue: false,
        },
        debug: true, // Включает отладку
    });

export default i18n;