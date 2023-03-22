import { CanvasUtils } from "../canvas-utils/CanvasUtils";
import { CollisionCircle } from "../collision/CollisionCircle";
import { Game } from "../game/Game";
import { GlobalSettings } from "../misc/GlobalSettings";
import { Movable } from "../movement/Movable";
import { MovementHandler } from "../movement/MovementHandler";
import { Weapon } from "../weapons/Weapon";

export class Player implements Movable {

  public speed: number = 10;
  public maxHp: number = 100;
  public currentHp: number = this.maxHp - 20;

  private canvasUtils!: CanvasUtils;
  private movementHandler: MovementHandler;
  private equippedWeapon: Weapon;

  constructor(
    private game: Game,
    public collision: CollisionCircle,
  ) {
    if (GlobalSettings.canvasInstances.get('player')) {
      this.canvasUtils = new CanvasUtils(GlobalSettings.canvasInstances.get('player')!);
    } else {
      throw new Error('Player canvas undefined');
    }
    this.movementHandler = new MovementHandler(this);
    this.equippedWeapon = new Weapon(10);
  }

  public update(): void {
    this.movementHandler.move();
    this.draw();
  }

  private draw(): void {
    this.canvasUtils.drawCircle(this.collision);
  }
}