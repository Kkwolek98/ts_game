import { Enemy } from "../entities/enemies/Enemy";
import { Player } from "../entities/Player";
import { Movable } from "../movement/interfaces/Movable.interface";
import { Bullet } from "../weapons/Bullet";

export class CollisionHandler {
  public handleCollision(entity1: Movable, entity2: Movable) {
    const { willCollide, distance } = this.calculateCollision(entity1, entity2);
    if (!willCollide) {
      entity1.willColide = false;
      // entity2.willColide = false;
      return;
    };

    // console.log(distance)
    // if (distance < 1 && !entity1.willColide) {
    //   console.log(entity2.movementVector)
    //   entity1.collision.x += entity2.movementVector.x * entity2.speed;
    //   entity1.collision.y += entity2.movementVector.y * entity2.speed;
    // }

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

  private calculateCollision(entity1: Movable, entity2: Movable): { willCollide: boolean, distance: number } {
    if (entity1 instanceof Player) {
      console.log(entity1.movementVector)
    }
    const distanceBetweenEntities = Math.hypot(
      (entity1.collision.x + entity1.speed * entity1.movementVector.x) - (entity2.collision.x + entity2.speed * entity2.movementVector.x),
      (entity1.collision.y + entity1.speed * entity1.movementVector.y) - (entity2.collision.y + entity2.speed * entity2.movementVector.y)
    );
    const sumOfRadii = entity1.collision.radius + entity2.collision.radius;

    return { willCollide: distanceBetweenEntities < sumOfRadii, distance: distanceBetweenEntities };
  }
}