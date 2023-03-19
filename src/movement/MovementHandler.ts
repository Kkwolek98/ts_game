import { Player } from "../player/Player";
import { DEFAULT_KEY_MAPPING, getMovementType, MovementType } from "./defaultKeyMapping";
import { Movable } from "./Movable";

export class MovementHandler {
  private pressedKeyY: string | null = null;
  private pressedKeyX: string | null = null;
  constructor(private movableObject: Movable) {
    if (this.movableObject instanceof Player) {
      this.setupListener();
    }
  }

  public move(x?: number, y?: number) {
    const pressedAnyKey = this.pressedKeyX || this.pressedKeyY;

    if (this.movableObject instanceof Player && pressedAnyKey) {
      const movementVector = this.getPositionDelta();

      this.movableObject.collision.x += movementVector.x;
      this.movableObject.collision.y += movementVector.y;
    } else if(!(this.movableObject instanceof Player)) {
      this.movableObject.collision.x += x! * this.movableObject.speed;
      this.movableObject.collision.y += y! * this.movableObject.speed;
    }

  }

  private getPositionDelta(): { x: number, y: number } {
    const movementVectorX = this.pressedKeyX ? (DEFAULT_KEY_MAPPING[this.pressedKeyX] || { x: 0 }) : { x: 0 };
    const movementVectorY = this.pressedKeyY ? (DEFAULT_KEY_MAPPING[this.pressedKeyY] || { y: 0 }) : { y: 0 };

    return {
      x: movementVectorX.x! * this.movableObject.speed,
      y: movementVectorY.y! * this.movableObject.speed
    };
  }

  private setupListener() {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (getMovementType(e.key) === MovementType.HORIZONTAL) {
        this.pressedKeyX = e.key;
      } else if (getMovementType(e.key) === MovementType.VERTICAL) {
        this.pressedKeyY = e.key;
      }
    });

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      if (getMovementType(e.key) === MovementType.HORIZONTAL) {
        this.pressedKeyX = null;
      } else if (getMovementType(e.key) === MovementType.VERTICAL) {
        this.pressedKeyY = null;
      }
    });
  }
}