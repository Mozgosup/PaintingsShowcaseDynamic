import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import HttpApi from 'i18next-http-backend';

const isProd = process.env.REACT_APP_ENV === 'prod';

console.log(`Using ${isProd ? 'S3' : 'local'} translations.`);

i18n
    .use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        backend: {
            loadPath: isProd
                ? 'https://paintingsbucket-mozgosup.s3.eu-north-1.amazonaws.com/biography/text/{{lng}}/translation.json'
                : '/locales/{{lng}}/translation.json',
        },
        ns: ['translation'],
        defaultNS:
            'translation',
        interpolation:
            {
                escapeValue: false,
            }
        ,
        debug: true,
    })
;

export default i18n;