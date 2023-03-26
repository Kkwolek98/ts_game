import { CollisionCircle } from "../collision/CollisionCircle";
import { Game } from "../game/Game";
import { GlobalSettings } from "../misc/GlobalSettings";

export class Lighting {

  private canvas: HTMLCanvasElement = GlobalSettings.canvasInstances.get('lightning')!;
  private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d')!;

  private lightningArea: number = 350;

  constructor(
    private game: Game
  ) { }

  public update(): void {
    const playerCoordinates = this.game.player.collision;

    this.draw(playerCoordinates);
  }

  private draw({ x, y, radius }: CollisionCircle): void {
    this.ctx.save();
    const gradient = this.ctx.createRadialGradient(x, y, radius, x, y, this.lightningArea);

    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.05)');
    gradient.addColorStop(0.9, 'rgba(0, 0, 0, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, .8)');

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.restore();
  }
}