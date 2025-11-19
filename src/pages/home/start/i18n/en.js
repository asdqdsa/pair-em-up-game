import { GAME_MODES } from '@/features/game/constants';

export const MENU_TEXT = {
  TITLE: 'Pair Em Up',
  TIP: 'Select game mode',

  BUTTONS: {
    STATS: 'Results',
    CONTINUE: 'Continue',
    SETTINGS: 'Settings',
    BACK: 'Back',
  },

  MODES: {
    [GAME_MODES.CLASSIC]: 'Classic',
    [GAME_MODES.RANDOM]: 'Random',
    [GAME_MODES.CHAOTIC]: 'Chaotic',
    [GAME_MODES.ZEN]: 'Zen',
  },
};
