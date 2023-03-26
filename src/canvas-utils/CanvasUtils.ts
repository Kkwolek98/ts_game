import { CollisionCircle } from '../collision/CollisionCircle';
import { angleToVector } from '../misc/consts/angleUtils';
import { GlobalSettings } from '../misc/GlobalSettings';
import { Dimensions, Point } from '../misc/interfaces/Point.interface';

interface RestoreSettings {
  restoreSettings: Function;
}

export enum DrawMode {
  FILL,
  STROKE,
}

export class CanvasUtils {
  private ctx: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public static clearAllCanvas(): void {
    GlobalSettings.getAllCanvasInstances().forEach((canvas) => {
      canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
    });
  }

  public drawCircle(
    { x, y, radius }: CollisionCircle,
    drawMode: DrawMode = DrawMode.FILL
  ): RestoreSettings {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
    this.fillOrStroke(drawMode);
    this.ctx.closePath();
    return { restoreSettings: this.restoreSettings };
  }

  public drawRectangle(
    { x, y }: Point,
    { width, height }: Dimensions,
    rotation: number | null = null,
    drawMode: DrawMode = DrawMode.FILL
  ): RestoreSettings {
    this.ctx.beginPath();
    this.ctx.save();
    if (rotation !== null) {
      const radians = (rotation * Math.PI) / 180;
      this.ctx.translate(x + width / 2, y); // move the origin to the top-left corner of the rectangle
      this.ctx.rotate(radians); // apply the rotation
      this.ctx.translate(-x - width / 2, -y); // move the origin back to the original position
    }
    this.ctx.rect(x, y, width, height);
    this.fillOrStroke(drawMode);
    this.ctx.closePath();
    this.ctx.restore();
    return { restoreSettings: this.restoreSettings };
  }

  public setStrokeStyle(
    style: string | CanvasGradient | CanvasPattern
  ): CanvasUtils {
    this.ctx.save();
    this.ctx.strokeStyle = style;
    return this;
  }

  public setFillStyle(
    style: string | CanvasGradient | CanvasPattern
  ): CanvasUtils {
    this.ctx.save();
    this.ctx.fillStyle = style;
    return this;
  }

  public restoreSettings() {
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
