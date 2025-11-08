export const events = {
  emit(event, detail) {
    document.dispatchEvent(new CustomEvent(event, { detail }));
  },

  on(event, cb) {
    document.addEventListener(event, cb);
  },

  off(event, cb) {
    document.removeEventListener(event, cb);
  },
};
