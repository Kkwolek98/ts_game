import { Enemy } from "../entities/enemies/Enemy";
import { Entity } from "../entities/Entity";
import { Movable } from "../movement/interfaces/Movable.interface";
import { Bullet } from "../weapons/Bullet";
import { CollisionCircle } from "./CollisionCircle";

export class CollisionHandler {
  public handleCollision(entity1: Movable, entity2: Movable) {
    // console.log(entity1.collision, entity2.collision)d
    if (!this.doEntitiesCollide(entity1.collision, entity2.collision)) return;

    console.log('hehe')

    if (entity1 instanceof Bullet && entity2 instanceof Enemy) {
      entity1.destroySelf = true;
      entity2.currentHp = 0;
    }
    if (entity2 instanceof Bullet && entity1 instanceof Enemy) {
      entity2.destroySelf = true;
      entity1.currentHp = 0;
    }
  }

  private doEntitiesCollide(entity1Collision: CollisionCircle, entity2Collision: CollisionCircle): boolean {
    const distanceBetweenEntities = Math.hypot(
      entity1Collision.x - entity2Collision.x,
      entity1Collision.y - entity2Collision.y
    );

    // console.log(distanceBetweenEntities, entity1Coqllision.radius + entity2Collision.radius)

    return distanceBetweenEntities <= entity1Collision.radius + entity2Collision.radius;
  }
}