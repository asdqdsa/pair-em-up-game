import { gameState } from '../state/runtimeState';
import { createSnapshotFromState } from '../storage/snapshot';
import { saveGameSnapshot } from '../storage/storage';

export function saveGame() {
  const snapshot = createSnapshotFromState(gameState);
  saveGameSnapshot(snapshot);
}
