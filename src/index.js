import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { addLocaleData, IntlProvider } from "react-intl";
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import translations_en from "./translations/en.json";
import translations_ru from "./translations/ru.json";

addLocaleData([...en, ...ru]);

const messages = {
    'en': translations_en,
    'ru': translations_ru
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
