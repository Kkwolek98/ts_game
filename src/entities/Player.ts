import { CollisionCircle } from '../collision/CollisionCircle';
import { Game } from '../game/Game';
import { MovementHandlerFactory } from '../movement/MovementHandlerFactory';
import { Weapon } from '../weapons/Weapon';
import { Entity } from './Entity';

export class Player extends Entity {
  constructor(collision: CollisionCircle, game: Game) {
    super(collision);
    this.equippedWeapon = new Weapon(this.canvas, this, 10, 5);
    this.movementHandler = MovementHandlerFactory.getHandler(this, game);
  }

  protected override draw(): void {
    this.canvasUtils.drawCircle(this.collision);
  }
}
