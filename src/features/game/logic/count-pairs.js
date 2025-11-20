import { checkPair } from '../lib/grid-utils';

export function countPairs(list) {
  let count = 0;
  for (let i = 0; i < list.length; i += 1) {
    for (let j = i + 1; j < list.length; j += 1) {
      const score = checkPair(i, j, list);
      if (score > 0) {
        count += 1;
      }
    }
  }

  return count;
}
