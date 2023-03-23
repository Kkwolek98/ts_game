import { Player } from "../player/Player";
import { DEFAULT_KEY_MAPPING, getMovementType, MovementType } from "./defaultKeyMapping";
import { Movable } from "./Movable";

export class MovementHandler {
  private pressedKeyY: string | null = null;
  private pressedKeyX: string | null = null;
  constructor(private entity: Movable) {
    if (this.entity instanceof Player) {
      this.setupListener();
    }
  }

  public move(x?: number, y?: number) {
    const pressedAnyKey = this.pressedKeyX || this.pressedKeyY;

    if (this.entity instanceof Player && pressedAnyKey) {
      const movementVector = this.getPositionDelta();

      const vector = this.getMovementVector();

      const rotation = Math.atan2(vector.x, vector.y)

      this.entity.rotation = ((rotation * -180) / Math.PI + 360) % 360;
      // this.entity.rotation = rotation;
      console.log(this.entity.rotation)
      this.entity.collision.x += movementVector.x;
      this.entity.collision.y += movementVector.y;
    } else if(!(this.entity instanceof Player)) {
      this.entity.collision.x += x! * this.entity.speed;
      this.entity.collision.y += y! * this.entity.speed;
    }

  }

  private getPositionDelta(): { x: number, y: number } {
    const vector = this.getMovementVector();

    return {
      x: vector.x! * this.entity.speed,
      y: vector.y! * this.entity.speed
    };
  }

  private getMovementVector(): { x: number, y: number } {
    const movementVectorX = this.pressedKeyX ? (DEFAULT_KEY_MAPPING[this.pressedKeyX] || { x: 0 }) : { x: 0 };
    const movementVectorY = this.pressedKeyY ? (DEFAULT_KEY_MAPPING[this.pressedKeyY] || { y: 0 }) : { y: 0 };

    return {
      x: movementVectorX.x!,
      y: movementVectorY.y!
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