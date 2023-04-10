import { CollisionCircle } from '../../collision/CollisionCircle';
import { Point } from '../../misc/interfaces/Point.interface';

export interface Movable {
  maxSpeed?: number;
  speed: number;
  collision: CollisionCircle;
  rotation: number;
  willColide: boolean;
  movementVector: Point
}
