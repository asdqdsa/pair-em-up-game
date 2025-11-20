/**
 * Runtime GameState
 * @typedef {Object} GameState runtime
 * @property {Array<number|null>} grid
 *  generated grid
 * @property {Array<number|null>} fullGrid
 *  generated fullGrid
 * @property {number} visibleLength
 * visibleLength
 * @property {'classic'|'random'|'chaotic'|'zen'|null} mode
 *  classic random etc
 * @property {Array<number>} selectedCells
 *  selected cells indices
 * @property {number} score
 *  game overall score
 * @property {'in-progress'|'win'|'loss'|null|string} status
 *  game status
 * @property {number} maxScore
 *  max score
 * @property {number} movesCount
 *  moves left
 * @property {number} elapsedSeconds
 *  time spent
 * @property {number|null} startTime
 *  Date.now()
 * @property {ReturnType<typeof setInterval> | null} timerRef
 *  timerIDref
 * @property {number} hintsLeft
 *  hints left
 * @property {number} undoMovesLeft
 *  undo moves left
 * @property {number} shufflesLeft
 *  shuffles left
 * @property {number} eraseCellLeft
 *  erase cell left
 * @property {number} revertMovesLeft
 *
 */

export {};
