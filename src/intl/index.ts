import { flatten } from './flatten';
import { MessageKeyValue } from './types';

import en from './en.messages';
import fr from './fr.messages';

export * from './types';

export const userLocale = navigator.language.toLowerCase().split(/[_-]+/)[0];

const translationMessages: MessageKeyValue = {
  en: flatten(en),
  fr: flatten(fr),
};
export default translationMessages;
