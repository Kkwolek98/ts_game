import { Entity } from '../entities/Entity';
import { Player } from '../entities/Player';
import {
  getMovementType,
  getMovementVector,
  MovementType,
} from './consts/defaultKeyMapping';

export class RotationHandler {
  constructor(private entity: Entity) {
    if (entity instanceof Player) {
      this.listenForStaticRotation();
    }
  }

  public handleRotation(): void {
    const { x, y } = this.entity.movementHandler.getMovementVector();

    this.setRotation(x, y);
  }

  public handleStaticRotation(key: string): void {
    const pressedKeyX =
      getMovementType(key) === MovementType.HORIZONTAL ? key : undefined;
    const pressedKeyY =
      getMovementType(key) === MovementType.VERTICAL ? key : undefined;

    const { x, y } = getMovementVector(pressedKeyX, pressedKeyY);

    this.setRotation(x, y);
  }

  private setRotation(x: number, y: number): void {
    if (x || y) {
      const rotation = Math.atan2(x, y);

      this.entity.rotation = ((rotation * -180) / Math.PI + 360) % 360;
    }
  }

  private listenForStaticRotation(): void {
    window.addEventListener('keydown', (e) => {
      if (!e.shiftKey) return;
      this.handleStaticRotation(e.key.toLowerCase());
    });
  }
}
