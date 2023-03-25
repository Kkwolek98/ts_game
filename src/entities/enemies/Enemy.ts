import { CollisionCircle } from "../../collision/CollisionCircle";
import { Game } from "../../game/Game";
import { Entity } from "../Entity";

export class Enemy extends Entity {

  public override speed: number = 6;

  constructor(
    collision: CollisionCircle,
    game: Game
  ) {
    super(collision, game);
  }

  protected override draw(): void {
    this.canvasUtils.setFillStyle('brown');
    this.canvasUtils.drawCircle(this.collision);
    this.canvasUtils.restoreSettings();
  }

}