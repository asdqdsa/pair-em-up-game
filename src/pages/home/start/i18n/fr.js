import { GAME_MODES } from '@/features/game/constants';

export const MENU_TEXT = {
  TITLE: 'Fais des paires',
  TIP: 'Choisissez un mode de jeu',

  BUTTONS: {
    STATS: 'Résultats',
    CONTINUE: 'Continuer',
    SETTINGS: 'Paramètres',
    BACK: 'Retour',
  },

  MODES: {
    [GAME_MODES.CLASSIC]: 'Classique',
    [GAME_MODES.RANDOM]: 'Aléatoire',
    [GAME_MODES.CHAOTIC]: 'Chaotique',
    [GAME_MODES.ZEN]: 'Zen',
  },
};
