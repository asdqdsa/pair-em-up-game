import { BASE_FONT_SIZE } from './constants';

export const toRem = (px) => `${px / BASE_FONT_SIZE}rem`;

export const getScrollbarWidth = () =>
  window.innerWidth - document.documentElement.clientWidth;

export function isValidKeybind(code) {
  return /^[A-Z]$/.test(code);
}

export function shuffleArray(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}
