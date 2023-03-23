import { CanvasUtils } from "../canvas-utils/CanvasUtils";
import { angleToVector } from "../misc/angleUtils";
import { Point } from "../misc/Point";
import { Vector } from "../misc/Vector";
import { Player } from "../player/Player";

export class Bullet {

  public destroySelf: boolean = false;
  
  private positionLimit: Point;
  private canvasUtils: CanvasUtils;
  private position: Point;
  private fireVector: Vector;

  constructor(
    position: Point,
    private speed: number,
    private distance: number,
    private sourceEntity: Player,
    private canvas: HTMLCanvasElement
  ) {
    this.position = {...position};
    this.positionLimit = { x: this.position.x, y: this.position.y - this.distance };
    this.canvasUtils = new CanvasUtils(this.canvas);
    this.fireVector = angleToVector(this.sourceEntity.rotation);
  }

    public draw(): void {
      if (!this.destroySelf) {
        this.canvasUtils.setFillStyle('red');
        this.canvasUtils.drawCircle({...this.position, radius: 5});
        this.canvasUtils.restoreSettings();
  
        this.updatePosition();

        if (this.positionLimit.y === this.position.y) {
          this.destroySelf = true;
        }
      }
    }

    private updatePosition(): void {
      this.position.y += this.fireVector.y * this.speed;
      this.position.x += this.fireVector.x * this.speed;
    }

}