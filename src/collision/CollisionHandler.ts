import { Enemy } from "../entities/enemies/Enemy";
import { Movable } from "../movement/interfaces/Movable.interface";
import { Bullet } from "../weapons/Bullet";

export class CollisionHandler {
  public handleCollision(entity1: Movable, entity2: Movable) {
    const { willCollide, distance, sumOfRadii } = this.calculateCollision(entity1, entity2);
    if (!willCollide) {
      entity1.willColide = false;
      entity2.willColide = false;
      return;
    };

    if (distance < sumOfRadii && !entity1.willColide) {
      entity1.collision.x += entity2.movementVector.x * entity1.maxSpeed!;
      entity1.collision.y += entity2.movementVector.y * entity1.maxSpeed!;
    }

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

  private calculateCollision(entity1: Movable, entity2: Movable): { willCollide: boolean, distance: number, sumOfRadii: number } {
    const futureDistanceBetweenEntities = Math.hypot(
      (entity1.collision.x + entity1.speed * entity1.movementVector.x) - (entity2.collision.x + entity2.speed * entity2.movementVector.x),
      (entity1.collision.y + entity1.speed * entity1.movementVector.y) - (entity2.collision.y + entity2.speed * entity2.movementVector.y)
    );
    const distanceBetweenEntities = Math.hypot(
      (entity1.collision.x) - (entity2.collision.x),
      (entity1.collision.y) - (entity2.collision.y)
    );
    const sumOfRadii = entity1.collision.radius + entity2.collision.radius;

    return { willCollide: futureDistanceBetweenEntities < sumOfRadii, distance: distanceBetweenEntities, sumOfRadii };
  }
}