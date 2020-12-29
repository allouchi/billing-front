import { Action, action, persist } from 'easy-peasy';
import translationMessages, { MessageKeyValue } from '../intl';

export interface IntlModel {
  locale: string;
  messages: MessageKeyValue;
  update: Action<IntlModel, string>;
}

let defaultLocale = 'en';
if (window.navigator.language !== ('fr-FR' || 'en-EN')) {
  defaultLocale = 'en';
}
if (window.navigator.language === 'fr-FR') {
  defaultLocale = 'fr';
}

const intl: IntlModel = {
  locale: defaultLocale,
  messages: translationMessages[defaultLocale] as any,
  update: action((state, payload) => {
    state.locale = payload;
    state.messages = translationMessages[payload] as any;
  }),
};

export default persist(intl);
