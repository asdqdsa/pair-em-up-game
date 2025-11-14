import { i18nStore } from '@/shared/i18n/index.js';

import { MENU_TEXT as en } from './en.js';
import { MENU_TEXT as fr } from './fr.js';

const i18nDict = {
  en,
  fr,
};

export function getMenuText(lang = 'en') {
  const l = i18nStore.getLang();
  return i18nDict[l] || i18nDict[lang] || i18nDict.en;
}
