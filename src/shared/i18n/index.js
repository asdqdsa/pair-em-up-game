let currLang = 'en';
export const i18nStore = {
  getLang: () => currLang.toLowerCase(),
  setLang: (lang) => (currLang = lang),
};
