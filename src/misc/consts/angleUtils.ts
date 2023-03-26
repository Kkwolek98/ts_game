const memoized: { [key: number]: any } = {};

export function angleToVector(angle: number): { x: number; y: number } {
  if (memoized[angle]) return memoized[angle];

  const radians = (angle * Math.PI) / 180;
  const y = Math.cos(radians);
  const x = -Math.sin(radians);

  memoized[angle] = { x, y };

  return { x, y };
}
