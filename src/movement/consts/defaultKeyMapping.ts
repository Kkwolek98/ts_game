export const DEFAULT_KEY_MAPPING: { [key: string]: { x?: number, y?: number } } = {
  w: { y: -1 },
  s: { y: 1 },
  a: { x: -1},
  d: { x: 1 },
}

export function getMovementType(key: string): MovementType {
  const movementVector = DEFAULT_KEY_MAPPING[key];
  if (!movementVector) return MovementType.UNASSIGNED;
  if (movementVector.x) {
    return MovementType.HORIZONTAL;
  } else {
    return MovementType.VERTICAL;
  }
}

export enum MovementType {
  VERTICAL,
  HORIZONTAL,
  UNASSIGNED
}