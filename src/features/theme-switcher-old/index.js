import { loadThemeState, updateThemeState } from './state';

function nextThemeSwitcher({ themeList, currentTheme }) {
  return themeList[(themeList.indexOf(currentTheme) + 1) % themeList.length];
}

export function initThemeSwitcher({ root, node, themeList }) {
  const { activeTheme } = loadThemeState();
  root.dataset.theme = activeTheme;

  node.addEventListener('click', () => {
    const { activeTheme } = loadThemeState();
    const next = nextThemeSwitcher({
      themeList,
      currentTheme: activeTheme,
    });
    root.dataset.theme = next;
    updateThemeState({ activeTheme: next });
  });
}
