import { CanvasUtils } from '../canvas-utils/CanvasUtils';
import { angleToVector } from '../misc/consts/angleUtils';
import { Point } from '../misc/interfaces/Point.interface';
import { Vector } from '../misc/interfaces/Vector.interface';
import { Entity } from '../entities/Entity';
import { Game } from '../game/Game';

export class Bullet {
  public destroySelf: boolean = false;

  private positionLimit: Point;
  private canvasUtils: CanvasUtils;
  private position: Point;
  private fireVector: Vector;
  private game: Game = Game.getInstance();

  constructor(
    position: Point,
    private speed: number,
    private distance: number,
    private sourceEntity: Entity,
    private canvas: HTMLCanvasElement
  ) {
    this.position = { ...position };
    this.positionLimit = {
      x: this.position.x,
      y: this.position.y - this.distance,
    };
    this.canvasUtils = new CanvasUtils(this.canvas);
    this.fireVector = angleToVector(this.sourceEntity.rotation);
  }

  public draw(): void {
    if (!this.destroySelf) {
      this.canvasUtils.setFillStyle('red');
      this.canvasUtils.drawCircle({ ...this.position, radius: 5 });
      this.canvasUtils.restoreSettings();

      this.updatePosition();

      if (this.isOutOfBounds()) {
        this.destroySelf = true;
      }
    }
  }

  private updatePosition(): void {
    this.position.y += this.fireVector.y * this.speed * this.game.settings.getTimeModifier();
    this.position.x += this.fireVector.x * this.speed * this.game.settings.getTimeModifier();
  }

  private isOutOfBounds(): boolean {
    const isOutOfXBounds = this.position.x < 0 || this.position.x > this.canvas.width;
    const isOutOfYBounds = this.position.y < 0 || this.position.y > this.canvas.height;

    return isOutOfXBounds || isOutOfYBounds;
  }
}
