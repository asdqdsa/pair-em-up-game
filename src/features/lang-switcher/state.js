/** @typedef {import('./types').LangState} LangState */

import { getLangState, setLangState } from './storage';

function initLangState() {
  /** @type {LangState} Lang State */
  const initialState = {
    activeLang: 'en',
    isFirstLoad: true,
  };

  setLangState(initialState);
  return initialState;
}

export function loadLangState() {
  const stale = getLangState();
  const fresh = stale ? { ...stale, isFirstLoad: false } : initLangState();
  return fresh;
}

export function updateLangState({ activeLang }) {
  const stale = loadLangState();
  const fresh = { ...stale, activeLang };
  setLangState(fresh);
  return fresh;
}
