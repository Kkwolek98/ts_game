import { CanvasUtils } from '../canvas-utils/CanvasUtils'
import { CollisionCircle } from '../collision/CollisionCircle'
import { GlobalSettings } from '../misc/GlobalSettings'
import { Point } from '../misc/interfaces/Point.interface'
import { Movable } from '../movement/interfaces/Movable.interface'
import { MovementHandler } from '../movement/MovementHandler'
import { RotationHandler } from '../movement/RotationHandler'
import { Weapon } from '../weapons/Weapon'

export class Entity implements Movable {
  public maxSpeed: number = 10;
  public speed: number = 0;
  public willColide: boolean = false;
  public movementVector: Point = { x: 0, y: 0 };

  public collisionAtRotation: number | undefined;

  public maxHp: number = 100;
  public currentHp: number = this.maxHp - 30;
  public rotation: number = 180;
  public movementHandler!: MovementHandler<unknown>;
  public rotationHandler: RotationHandler;
  public canvasUtils!: CanvasUtils;

  public debugColor?: string;

  protected equippedWeapon?: Weapon;
  protected canvas: HTMLCanvasElement =
    GlobalSettings.canvasInstances.get('player')!;

  constructor(public collision: CollisionCircle) {
    if (this.canvas) {
      this.canvasUtils = new CanvasUtils(this.canvas);
    } else {
      throw new Error('Player canvas undefined');
    }
    this.rotationHandler = new RotationHandler(this);
  }

  public update(): void {
    this.movementHandler.move();
    this.rotationHandler.handleRotation();
    this.equippedWeapon?.draw();
    this.draw();
    this.movementVector = this.movementHandler.getMovementVector();
  }

  protected draw(): void {
    this.canvasUtils.drawCircle(this.collision);
  }
}
