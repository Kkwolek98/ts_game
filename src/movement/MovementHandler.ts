import { Game } from '../game/Game';
import { Vector } from '../misc/interfaces/Vector.interface';
import { Movable } from './interfaces/Movable.interface';

export class MovementHandler<EntityType> {
  constructor(protected entity: Movable & EntityType, protected game: Game) { }

  public move(): void { }

  public getMovementVector(): Vector {
    return { x: 0, y: 0 };
  }

  protected getPositionDelta(vector?: Vector): { x: number; y: number } {
    if (!vector) {
      vector = this.getMovementVector();
    }

    const diagonalModifier =
      Math.abs(Math.ceil(vector.x && vector.y)) * Math.SQRT1_2;

    return {
      x: vector.x! * this.entity.speed * (diagonalModifier || 1) * this.game.settings.getTimeModifier(),
      y: vector.y! * this.entity.speed * (diagonalModifier || 1) * this.game.settings.getTimeModifier(),
    };
  }

  protected changeSpeed(increment: number): void {
    if (this.entity.maxSpeed! >= this.entity.speed + increment && !(this.entity.speed + increment <= 0)) {
      this.entity.speed += increment;
    } else if (this.entity.speed + increment >= this.entity.maxSpeed!) {
      this.entity.speed = this.entity.maxSpeed!;
    } else if (this.entity.speed + increment <= 0) {
      this.entity.speed = 0;
    }
  }
}
