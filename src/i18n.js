import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n.use(LanguageDetector).init({
    resources: {
        en: {
            translations: {
                'home.title': 'Time is money',
                'home.label': 'Your net monthly income',
                'home.placeholder': 'Net income',
                'home.btn': 'Start counters',
                'counter.message': 'You have earned this year',
                'counter.message-month': 'Month: {{salary}}',
                'counter.message-week': 'This week: {{salary}}',
                'counter.message-today': 'Today: {{salary}}',
                'counter.message-hour': 'This hour: {{salary}}',
                'counter.share-link': 'Save this counter or share with your friend:'
            }
        },
        ru: {
            translations: {
                'home.title': 'Время - деньги!',
                'home.label': 'Ваш чистый месячный доход',
                'home.placeholder': 'Чистый доход',
                'home.btn': 'Посчитать доходы',
                'counter.message': 'За этот год вы заработали',
                'counter.message-month': 'За месяц: {{salary}}',
                'counter.message-week': 'За неделю: {{salary}}',
                'counter.message-today': 'Сегодня: {{salary}}',
                'counter.message-hour': 'За час: {{salary}}',
                'counter.share-link': 'Сохранить этот счётчик или поделиться с друзьями:'
            }
        }
    },
    fallbackLng: 'en',
    debug: true,

    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false,

    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },

    react: {
        wait: true
    },

    detection: {
        order: ['navigator', 'querystring', 'cookie', 'localStorage', 'htmlTag', 'path', 'subdomain']
    }
})

export default i18n
