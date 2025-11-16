let state = {
  currScreen: null,
  currMode: null,
  isBackActive: true,
  isLangActive: true,
};

const listeners = new Set();

export const appCtx = {
  get() {
    return state;
  },

  set(fresh) {
    state = { ...state, ...fresh };
    listeners.forEach((cb) => cb(state));
  },

  subscribe(cb) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
};
