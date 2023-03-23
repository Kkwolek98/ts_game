import { CanvasUtils } from "../canvas-utils/CanvasUtils";
import { Point } from "../misc/interfaces/Point.interface";
import { Player } from "../player/Player";

export class HpBar {
  private canvasUtils: CanvasUtils;
  private readonly HP_BAR_HEIGHT: number = 20;
  private readonly HP_BAR_POSITION: Point = { x: 20, y: 20 };

  constructor(
    private player: Player,
    private canvas: HTMLCanvasElement
  ) {
      this.canvasUtils = new CanvasUtils(this.canvas);
  }

  public update() {
    this.draw();
  }
  
  private getHpPercentage(): number {
    return (this.player.currentHp / this.player.maxHp) * 100;
  }

  private draw(): void {
    const hpPercentage = this.getHpPercentage();
    this.canvasUtils
      .setFillStyle('green')
      .drawRectangle(
        { x: this.HP_BAR_POSITION.x, y: this.HP_BAR_POSITION.y },
        { width: hpPercentage, height: this.HP_BAR_HEIGHT }
      );
    this.canvasUtils.restoreSettings();
    if (hpPercentage !== 100) {
      this.canvasUtils
        .setFillStyle('red')
        .drawRectangle(
          { x: this.HP_BAR_POSITION.x + hpPercentage, y: this.HP_BAR_POSITION.y },
          { width: 100 - hpPercentage, height: this.HP_BAR_HEIGHT } 
        );
    }
    this.canvasUtils.restoreSettings();
  }
}