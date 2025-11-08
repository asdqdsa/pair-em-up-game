export const saveState = (storageKey, state) => {
  localStorage.setItem(storageKey, JSON.stringify(state));
};

export const loadState = (storageKey) => {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    console.warn(`Failed to parse ${storageKey}`);
    return null;
  }
};

export const clearState = (storageKey) => {
  localStorage.removeItem(storageKey);
};
