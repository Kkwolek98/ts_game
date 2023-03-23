import { CollisionCircle } from "../../collision/CollisionCircle";

export interface Movable {
  speed: number
  collision: CollisionCircle
  rotation: number
}