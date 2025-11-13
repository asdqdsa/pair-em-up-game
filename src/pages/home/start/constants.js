import { GAME_MODES } from '@/features/game/constants';

export const UI_COMMANDS = {
  TITLE: 'Pair Em Up',
  TIP: 'Select game mode',
  STATS: { label: 'Results', action: { type: 'stats' } },

  CONTINUE: {
    label: 'Continue',
    action: { type: 'continue' },
  },

  SETTINGS: {
    label: 'Settings',
    action: { type: 'settings' },
  },

  BACK_TO_MENU: {
    label: 'Back',
    title: 'Go back',
    action: { type: 'back-to-menu' },
  },

  MODES: [
    {
      label: 'Classic',
      action: { type: 'mode', payload: GAME_MODES.CLASSIC },
    },
    {
      label: 'Random',
      action: { type: 'mode', payload: GAME_MODES.RANDOM },
    },
    {
      label: 'Chaotic',
      action: { type: 'mode', payload: GAME_MODES.CHAOTIC },
    },
    // { label: 'Zen', action: { type: 'mode', payload: { mode: GAME_MODES.ZEN } } },
  ],
};
