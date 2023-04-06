import { CanvasUtils } from '../canvas-utils/CanvasUtils';
import { angleToVector } from '../misc/consts/angleUtils';
import { Point } from '../misc/interfaces/Point.interface';
import { Vector } from '../misc/interfaces/Vector.interface';
import { Entity } from '../entities/Entity';
import { Game } from '../game/Game';
import { Movable } from '../movement/interfaces/Movable.interface';
import { CollisionCircle } from '../collision/CollisionCircle';

export class Bullet implements Movable {
  public destroySelf: boolean = false;
  public collision: CollisionCircle;
  public rotation: number = 0;

  private positionLimit: Point;
  private canvasUtils: CanvasUtils;
  private fireVector: Vector;
  private game: Game = Game.getInstance();

  constructor(
    position: Point,
    public speed: number,
    private distance: number,
    private sourceEntity: Entity,
    private canvas: HTMLCanvasElement
  ) {
    this.collision = { ...position, radius: 5 };
    this.positionLimit = {
      x: this.collision.x,
      y: this.collision.y - this.distance,
    };
    this.canvasUtils = new CanvasUtils(this.canvas);
    this.fireVector = angleToVector(this.sourceEntity.rotation);
    this.game.spatialHashGrid.newClient(this);
  }

  public draw(): void {
    if (!this.destroySelf) {
      this.canvasUtils.setFillStyle('red');
      this.canvasUtils.drawCircle({ ...this.collision, radius: 5 });
      this.canvasUtils.restoreSettings();

      this.updatePosition();

      if (this.isOutOfBounds()) {
        this.destroySelf = true;
      }
    }
  }

  private updatePosition(): void {
    this.collision.y += this.fireVector.y * this.speed * this.game.settings.getTimeModifier();
    this.collision.x += this.fireVector.x * this.speed * this.game.settings.getTimeModifier();
  }

  private isOutOfBounds(): boolean {
    const isOutOfXBounds = this.collision.x < 0 || this.collision.x > this.canvas.width;
    const isOutOfYBounds = this.collision.y < 0 || this.collision.y > this.canvas.height;

    return isOutOfXBounds || isOutOfYBounds;
  }
}
