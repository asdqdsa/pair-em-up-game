import { APP_EVENTS } from '@/shared/event/events';
import { UIButton } from '@/shared/uikit/components/UIButton';
import { i18nStore } from '@/shared/i18n';

import { loadLangState } from './state';

export function LanguageButton({ events, className }) {
  let { activeLang } = loadLangState();

  events.on(APP_EVENTS.LANG_UPDATED, ({ detail }) => {
    el.textContent = `${detail}`;
    i18nStore.setLang(detail);
  });

  const el = UIButton({
    className: `${className}`,
    onClick: () => events.emit(APP_EVENTS.LANG_NEXT),
    children: `${activeLang}`,
  });

  return el;
}
