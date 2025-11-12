/**
 * Event broker with CustomEvent
 * @namespace events
 */
export const events = {
  on: (event, cb) => document.addEventListener(event, cb),

  off: (event, cb) => document.removeEventListener(event, cb),

  emit: (event, detail = null) => {
    document.dispatchEvent(new CustomEvent(event, { detail }));
    document.dispatchEvent(new CustomEvent('*', { detail: { event, detail } }));
  },

  /**
   * Catches all '*' events
   * @param {(payload: { event: string; detail: unknown }) => void} cb
   */
  all: (cb) =>
    document.addEventListener('*', (e) => {
      const customEvent =
        /** @type {CustomEvent<{ event: string; detail: unknown }>} */ (e);
      cb(customEvent.detail);
    }),

  once: (event, cb) => {
    const handleOnce = (e) => {
      cb(e);
      document.removeEventListener(event, handleOnce);
    };
    document.addEventListener(event, handleOnce);
  },
};
