import { CollisionCircle } from '../../collision/CollisionCircle';

export interface Movable {
  maxSpeed?: number;
  speed: number;
  collision: CollisionCircle;
  rotation: number;
}
