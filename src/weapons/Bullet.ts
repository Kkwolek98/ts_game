import { CanvasUtils } from "../canvas-utils/CanvasUtils";
import { Point } from "../misc/Point";

export class Bullet {

  public destroySelf: boolean = false;
  
  private positionLimit: Point;
  private canvasUtils: CanvasUtils;
  private position: Point;

  constructor(
    position: Point,
    private speed: number,
    private distance: number,
    private canvas: HTMLCanvasElement
  ) {
    this.position = {...position};
    this.positionLimit = { x: this.position.x, y: this.position.y - this.distance };
    this.canvasUtils = new CanvasUtils(this.canvas);
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
      this.position.y -= this.speed;
    }

}