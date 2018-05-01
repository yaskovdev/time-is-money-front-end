import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { addLocaleData, IntlProvider } from "react-intl";
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import lv from 'react-intl/locale-data/lv';
import et from 'react-intl/locale-data/et';
import translations_en from "./translations/en.json";
import translations_ru from "./translations/ru.json";
import translations_lv from "./translations/lv.json";
import translations_et from "./translations/et.json";

addLocaleData([...en, ...ru, ...lv, ...et]);

const messages = {
    'en': translations_en,
    'ru': translations_ru,
    'lv': translations_lv,
    'et': translations_et
};

const language = navigator.language.split(/[-_]/)[0];
const translations = messages[language] || messages['en'];

ReactDOM.render(
    <IntlProvider locale={language} messages={translations}>
        <App />
    </IntlProvider>,
    document.getElementById('root')
);
registerServiceWorker();
