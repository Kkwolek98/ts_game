import { Player } from "../entities/Player";
import { Game } from "../game/Game";
import { angleToVector } from "../misc/consts/angleUtils";
import { Vector } from "../misc/interfaces/Vector.interface";
import { DEFAULT_KEY_MAPPING, getMovementType, getMovementVector, MovementType } from "./consts/defaultKeyMapping";
import { Movable } from "./interfaces/Movable.interface";

export class MovementHandler {
  private pressedKeyY: string | undefined;
  private pressedKeyX: string | undefined;
  private allPressedKeysX: string[] = [];
  private allPressedKeysY: string[] = [];

  constructor(
    private entity: Movable,
    private game: Game  
  ) {
    if (this.entity instanceof Player) {
      this.setupListener();
    }
  }

  public move(): void {
    const pressedAnyKey = this.pressedKeyX || this.pressedKeyY;

    if (this.entity instanceof Player && pressedAnyKey) {
      this.handlePlayerMovement();
    } else if(!(this.entity instanceof Player)) {
      this.followPlayer();
    }

  }

  public getMovementVector(): { x: number, y: number } {
    return getMovementVector(this.pressedKeyX, this.pressedKeyY);
  }

  private getPositionDelta(vector?: Vector): { x: number, y: number } {
    if (!vector) {
      vector = this.getMovementVector();
    }

    const diagonalModifier = Math.abs(Math.ceil(vector.x && vector.y)) * Math.SQRT1_2;

    return {
      x: vector.x! * this.entity.speed * (diagonalModifier || 1),
      y: vector.y! * this.entity.speed * (diagonalModifier || 1)
    };
  }

  private setupListener(): void {
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

  private followPlayer(): void {
    const radiansToPlayer = Math.atan2(
      this.game?.player.collision.x - this.entity.collision.x,
      this.game?.player.collision.y - this.entity.collision.y
    );
    const angle = ((radiansToPlayer * -180) / Math.PI + 360) % 360;
    const vector = angleToVector(angle);
    const movementVector = this.getPositionDelta(vector);
    this.entity.collision.x += movementVector.x;
    this.entity.collision.y += movementVector.y;
  }

  private handlePlayerMovement(): void {
    const movementVector = this.getPositionDelta();
    this.entity.collision.x += movementVector.x;
    this.entity.collision.y += movementVector.y;
  }
}