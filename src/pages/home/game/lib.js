import { GAME_MODES } from '@/features/game/game-modes';
import { shuffleArray } from '@/shared/utils/lib';

import { MAX_LEN } from './constants';

export const getGameGrid = ({ mode = 'classic' }) => {
  let str = '';

  const grid = {
    [GAME_MODES.CLASSIC]: () => {
      for (let i = 0; i < MAX_LEN; i += 1) str += i + 1;
      return str
        .split('')
        .filter((char, idx, arr) => arr[idx + 1] !== '0' && char !== '0')
        .slice(0, MAX_LEN);
    },

    [GAME_MODES.RANDOM]: () => {
      for (let i = 0; i < MAX_LEN; i += 1) str += i + 1;
      return shuffleArray(
        str
          .split('')
          .filter((char, idx, arr) => arr[idx + 1] !== '0' && char !== '0')
          .slice(0, MAX_LEN)
      );
    },

    [GAME_MODES.CHAOTIC]: () => {
      while (str.length < MAX_LEN) str += Math.floor(Math.random() * 9) + 1;

      return shuffleArray(
        str
          .split('')
          .filter((char, idx, arr) => arr[idx + 1] !== '0' && char !== '0')
          .slice(0, MAX_LEN)
      );
    },
  };

  return grid[mode]();
};
