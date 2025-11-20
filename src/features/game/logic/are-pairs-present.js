import { checkPair } from '../lib/grid-utils';

export function arePairsPresent({ list }) {
  // const list = gameState.grid;

  for (let i = 0; i < list.length; i += 1) {
    for (let j = i + 1; j < list.length; j += 1) {
      const score = checkPair(i, j, list);
      if (score > 0) console.log('pair i, j', i, j, score);
      if (score > 0) {
        return true;
      }
    }
  }
  return false;
}
