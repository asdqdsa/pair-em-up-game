let locked = false;

export const lock = {
  run: async (task) => {
    if (locked) return;
    if (!locked) {
      locked = true;
      try {
        await task();
      } catch (error) {
        console.error(error);
      } finally {
        locked = false;
      }
    }
  },

  hold: () => {
    locked = true;
  },

  clear: () => {
    locked = false;
  },

  get status() {
    return locked;
  },
};
