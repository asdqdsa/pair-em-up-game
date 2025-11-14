import { events } from '@/shared/event/event-broker';
import { APP_EVENTS } from '@/shared/event/events';

import { loadLangState, updateLangState } from './state';
import { LANGS } from './constants';

function nextLang({ langList, currentLang }) {
  return langList[(langList.indexOf(currentLang) + 1) % langList.length];
}

export function initLang({ root }) {
  const { activeLang } = loadLangState();
  // root.dataset.lang = activeLang;

  events.on(APP_EVENTS.LANG_NEXT, () => {
    const { activeLang } = loadLangState();
    const next = nextLang({
      langList: LANGS,
      currentLang: activeLang,
    });
    events.emit(APP_EVENTS.LANG_UPDATED, next);
    // root.dataset.lang = next;
    // REDO THIS
    document.documentElement.setAttribute('lang', next);
    updateLangState({ activeLang: next });
  });
}
