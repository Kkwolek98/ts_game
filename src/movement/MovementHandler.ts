import { Game } from '../game/Game';
import { Vector } from '../misc/interfaces/Vector.interface';
import { Movable } from './interfaces/Movable.interface';

export class MovementHandler {
  constructor(protected entity: Movable, protected game: Game) {}

  public move(): void {}

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
      x: vector.x! * this.entity.speed * (diagonalModifier || 1),
      y: vector.y! * this.entity.speed * (diagonalModifier || 1),
    };
  }
}
