import { CanvasUtils } from '../canvas-utils/CanvasUtils'
import { CollisionCircle } from '../collision/CollisionCircle'
import { Game } from '../game/Game'
import { GlobalSettings } from '../misc/GlobalSettings'
import { Movable } from '../movement/interfaces/Movable.interface'
import { MovementHandler } from '../movement/MovementHandler'
import { RotationHandler } from '../movement/RotationHandler'
import { Weapon } from '../weapons/Weapon'

export class Entity implements Movable {
  public speed: number = 10
  public maxHp: number = 100
  public currentHp: number = this.maxHp - 30
  public rotation: number = 180
  public movementHandler!: MovementHandler
  public rotationHandler: RotationHandler
  public canvasUtils!: CanvasUtils

  public debugColor?: string;

  protected equippedWeapon?: Weapon
  protected canvas: HTMLCanvasElement =
    GlobalSettings.canvasInstances.get('player')!

  constructor(public collision: CollisionCircle, game: Game) {
    if (this.canvas) {
      this.canvasUtils = new CanvasUtils(this.canvas)
    } else {
      throw new Error('Player canvas undefined')
    }
    // this.movementHandler = MovementHandlerFactory.getHandler(this, game);
    this.rotationHandler = new RotationHandler(this)
  }

  public update(): void {
    this.movementHandler.move()
    this.rotationHandler.handleRotation()
    this.equippedWeapon?.draw()
    this.draw()
  }

  protected draw(): void {
    this.canvasUtils.drawCircle(this.collision)
  }
}
