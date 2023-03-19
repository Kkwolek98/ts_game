import { CollisionCircle } from "../collision/CollisionCircle";
import { Point } from "../misc/Point";

interface RestoreSettings {restoreSettings: Function};

export enum DrawMode { FILL, STROKE };

export class CanvasUtils {

  private ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public drawCircle({x, y, radius}: CollisionCircle, drawMode: DrawMode = DrawMode.FILL): RestoreSettings {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.fillOrStroke(drawMode);
    this.ctx.closePath();
    return { restoreSettings: this.restoreSettings };
  }

  public drawRectangle(from: Point, to: Point, drawMode: DrawMode = DrawMode.FILL): RestoreSettings {
    console.log(this.ctx.fillStyle)
    this.ctx.beginPath();
    this.ctx.rect(from.x, from.y, to.x, to.y);
    this.fillOrStroke(drawMode);
    this.ctx.closePath();
    return { restoreSettings: this.restoreSettings };
  }

  public setStrokeStyle(style: string | CanvasGradient | CanvasPattern): CanvasUtils {
    this.ctx.save();
    this.ctx.strokeStyle = style;
    return this;
  }

  public setFillStyle(style: string | CanvasGradient | CanvasPattern): CanvasUtils {
    this.ctx.save();
    this.ctx.fillStyle = style;
    return this;
  }

  public restoreSettings() {
    console.log(this.ctx)
    this.ctx.restore();
  }

  public clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private fillOrStroke(drawMode: DrawMode): void {
    if (drawMode === DrawMode.FILL) this.ctx.fill();
    else this.ctx.stroke();
  }

}