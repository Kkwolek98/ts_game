import { Player } from "../entities/Player";
import { DEFAULT_KEY_MAPPING, getMovementType, getMovementVector, MovementType } from "./consts/defaultKeyMapping";
import { Movable } from "./interfaces/Movable.interface";

export class MovementHandler {
  private pressedKeyY: string | undefined;
  private pressedKeyX: string | undefined;
  private allPressedKeysX: string[] = [];
  private allPressedKeysY: string[] = [];

  constructor(private entity: Movable) {
    if (this.entity instanceof Player) {
      this.setupListener();
    }
  }

  public move(x?: number, y?: number) {
    const pressedAnyKey = this.pressedKeyX || this.pressedKeyY;

    if (this.entity instanceof Player && pressedAnyKey) {
      const movementVector = this.getPositionDelta();
      this.entity.collision.x += movementVector.x;
      this.entity.collision.y += movementVector.y;
    } else if(!(this.entity instanceof Player)) {
      this.entity.collision.x += x! * this.entity.speed;
      this.entity.collision.y += y! * this.entity.speed;
    }

  }

  public getMovementVector(): { x: number, y: number } {
    return getMovementVector(this.pressedKeyX, this.pressedKeyY);
  }

  private getPositionDelta(): { x: number, y: number } {
    const vector = this.getMovementVector();

    const diagonalModifier = Math.abs(vector.x && vector.y) * Math.SQRT1_2;

    return {
      x: vector.x! * this.entity.speed * (diagonalModifier || 1),
      y: vector.y! * this.entity.speed * (diagonalModifier || 1)
    };
  }

  private setupListener() {
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
        this.allPressedKeysX = this.allPressedKeysX.filter((key) => key !== e.key);
        this.pressedKeyX = this.allPressedKeysX[this.allPressedKeysX.length - 1];
      } else if (getMovementType(e.key) === MovementType.VERTICAL) {
        this.allPressedKeysY = this.allPressedKeysY.filter((key) => key !== e.key);
        this.pressedKeyY = this.allPressedKeysY[this.allPressedKeysY.length - 1];
      }
    });
  }
}