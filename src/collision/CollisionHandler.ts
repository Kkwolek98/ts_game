import { Enemy } from "../entities/enemies/Enemy";
import { Movable } from "../movement/interfaces/Movable.interface";
import { Bullet } from "../weapons/Bullet";

export class CollisionHandler {
  public handleCollision(entity1: Movable, entity2: Movable) {
    if (!this.willEntitiesCollide(entity1, entity2)) {
      entity1.willColide = false;
      entity2.willColide = false;
      return;
    };

    entity1.willColide = true;
    entity2.willColide = true;

    if (entity1 instanceof Bullet && entity2 instanceof Enemy) {
      entity1.destroySelf = true;
      entity2.currentHp = 0;
    }
    if (entity2 instanceof Bullet && entity1 instanceof Enemy) {
      entity2.destroySelf = true;
      entity1.currentHp = 0;
    }
  }

  private willEntitiesCollide(entity1: Movable, entity2: Movable): boolean {
    const distanceBetweenEntities = Math.hypot(
      (entity1.collision.x + entity1.collision.radius * entity1.movementVector.x) - (entity2.collision.x + entity2.collision.radius * entity2.movementVector.x),
      (entity1.collision.y + entity1.collision.radius * entity1.movementVector.y) - (entity2.collision.y + entity2.collision.radius * entity2.movementVector.y)
    );

    return distanceBetweenEntities < entity1.collision.radius + entity2.collision.radius;
  }
}