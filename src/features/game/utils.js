const GRID_WIDTH = 9;

export function indexToPos(index) {
  const row = Math.floor(index / GRID_WIDTH);
  const col = index % GRID_WIDTH;
  return { row, col };
}

// without null cells
export function areNeighbours(aIndex, bIndex, list) {
  const a = indexToPos(aIndex);
  const b = indexToPos(bIndex);

  // const dRow = Math.abs(a.row - b.row);
  // const dCol = Math.abs(a.col - b.col);

  if (a.row === b.row) {
    const fromCol = Math.min(a.col, b.col) + 1;
    const toCol = Math.max(a.col, b.col);

    for (let col = fromCol; col < toCol; col += 1) {
      const idx = a.row * GRID_WIDTH + col;
      const val = list[idx];
      if (val != null && val !== '') {
        return false;
      }
    }

    return true;
  }

  if (a.col === b.col) {
    const fromRow = Math.min(a.row, b.row) + 1;
    const toRow = Math.max(a.row, b.row);

    for (let row = fromRow; row < toRow; row += 1) {
      const idx = row * GRID_WIDTH + a.col;
      const val = list[idx];
      if (val != null && val !== '') {
        return false;
      }
    }

    return true;
  }

  // const directNeigbour = dRow + dCol === 1;

  const validNeighbour =
    (a.row + 1 === b.row && a.col === GRID_WIDTH - 1 && b.col === 0) ||
    (b.row + 1 === a.row && b.col === GRID_WIDTH - 1 && a.col === 0);

  return validNeighbour || false;
}

export function checkPair(a, b, list) {
  if (a === b) return -1;

  const areValidNeighbours = areNeighbours(a, b, list);
  if (!areValidNeighbours) return 0;

  if (list[a] === null || list[b] === null) return 0;

  const aVal = +list[a];
  const bVal = +list[b];

  if (aVal === 5 && bVal === 5) return 3;
  if (aVal === bVal) return 1;
  if (aVal + bVal === 10) return 2;

  return 0;
}
