import { CanvasUtils } from "../canvas-utils/CanvasUtils";
import { CollisionCircle } from "../collision/CollisionCircle";
import { Game } from "../game/Game";
import { Movable } from "../movement/Movable";
import { MovementHandler } from "../movement/MovementHandler";

export class Player implements Movable {

  public speed: number = 10;
  private canvasUtils: CanvasUtils;
  private movementHandler: MovementHandler;
  
  constructor(
    private game: Game,
    public collision: CollisionCircle,
    canvas: HTMLCanvasElement
  ) {
    this.canvasUtils = new CanvasUtils(canvas);
    this.movementHandler = new MovementHandler(this);
  }

  public update(): void {
    this.movementHandler.move();
    this.draw();
  }

  private draw(): void {
    this.canvasUtils.drawCircle(this.collision);
  }
}