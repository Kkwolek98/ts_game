import { Player } from '../entities/Player';
import { Game } from '../game/Game';
import {
  getMovementType,
  getMovementVector,
  MovementType,
} from './consts/defaultKeyMapping';
import { MovementHandler } from './MovementHandler';

export class PlayerMovementHandler extends MovementHandler {
  private pressedKeyY: string | undefined;
  private pressedKeyX: string | undefined;
  private allPressedKeysX: string[] = [];
  private allPressedKeysY: string[] = [];

  constructor(entity: Player, game: Game) {
    super(entity, game);
    this.setupListeners();
  }

  public move(): void {
    const pressedAnyKey = this.pressedKeyX || this.pressedKeyY;

    if (pressedAnyKey) {
      this.handlePlayerMovement();
    }
  }

  public getMovementVector(): { x: number; y: number } {
    return getMovementVector(this.pressedKeyX, this.pressedKeyY);
  }

  private handlePlayerMovement(): void {
    const movementVector = this.getPositionDelta();
    this.entity.collision.x += movementVector.x;
    this.entity.collision.y += movementVector.y;
  }

  private setupListeners(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (getMovementType(e.key) === MovementType.HORIZONTAL) {
        this.allPressedKeysX.push(e.key);
        this.pressedKeyX = e.key;
      } else if (getMovementType(e.key) === MovementType.VERTICAL) {
        this.allPressedKeysY.push(e.key);
        this.pressedKeyY = e.key;
      }
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      if (getMovementType(e.key) === MovementType.HORIZONTAL) {
        this.allPressedKeysX = this.allPressedKeysX.filter(
          (key) => key !== e.key
        );
        this.pressedKeyX =
          this.allPressedKeysX[this.allPressedKeysX.length - 1];
      } else if (getMovementType(e.key) === MovementType.VERTICAL) {
        this.allPressedKeysY = this.allPressedKeysY.filter(
          (key) => key !== e.key
        );
        this.pressedKeyY =
          this.allPressedKeysY[this.allPressedKeysY.length - 1];
      }
    });
  }
}
