export function angleToVector(angle: number): { x: number, y: number } {
  const radians = angle * Math.PI / 180;
  const x = Math.cos(radians);
  const y = Math.sin(radians);
  return { x, y };
}