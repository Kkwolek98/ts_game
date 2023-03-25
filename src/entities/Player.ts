import { CollisionCircle } from "../collision/CollisionCircle";
import { Game } from "../game/Game";
import { Weapon } from "../weapons/Weapon";
import { Entity } from "./Entity";

export class Player extends Entity {
  constructor(
    collision: CollisionCircle,
    game: Game
  ) {
    super(collision, game);
    this.equippedWeapon = new Weapon(this.canvas, this, 10);
  }

  protected override draw(): void {
    this.canvasUtils.drawCircle(this.collision);
  }
}