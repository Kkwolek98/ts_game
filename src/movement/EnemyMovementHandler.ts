import { Enemy } from '../entities/enemies/Enemy';
import { Game } from '../game/Game';
import { angleToVector } from '../misc/consts/angleUtils';
import { Point } from '../misc/interfaces/Point.interface';
import { Vector } from '../misc/interfaces/Vector.interface';
import { MovementHandler } from './MovementHandler';

export class EnemyMovementHandler extends MovementHandler {

  private detectionRadius = 200;
  private freeRoamTarget?: Vector;

  constructor(entity: Enemy, game: Game) {
    super(entity, game);
  }

  public override move(): void {
    const distanceToPlayer = this.getDistanceToPoint(this.game.player.collision);
    const isNotTouchingPlayer = distanceToPlayer >= (this.game.player.collision.radius + this.entity.collision.radius);
    const isInDetectionRadius = distanceToPlayer <= this.detectionRadius;

    // if (isNotTouchingPlayer && isInDetectionRadius) {
    //   this.followPlayer();
    // } else if (isNotTouchingPlayer) {
    //   this.roamFreely();
    // }
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

  private roamFreely(): void {
    if (!this.freeRoamTarget) {
      this.setNewFreeRoamingTarget();
    }

    const distanceToFreeRoamTarget = this.getDistanceToPoint(this.freeRoamTarget!);

    if (distanceToFreeRoamTarget <= this.entity.collision.radius * 2) {
      return this.setNewFreeRoamingTarget();
    }

    const radiansToPoint = Math.atan2(
      this.freeRoamTarget!.x - this.entity.collision.x,
      this.freeRoamTarget!.y - this.entity.collision.y
    );
    const angle = ((radiansToPoint * -180) / Math.PI + 360) % 360;
    const vector = angleToVector(angle);
    const movementVector = this.getPositionDelta(vector);
    this.entity.collision.x += movementVector.x;
    this.entity.collision.y += movementVector.y;
  }

  private getRandomPoint(): Point {
    const point = {
      x: Math.random() * this.game.canvas.width,
      y: Math.random() * this.game.canvas.height
    };

    return point;
  }

  private getDistanceToPoint(point: Point): number {
    const distance = Math.hypot(
      Math.abs(point.x - this.entity.collision.x),
      Math.abs(point.y - this.entity.collision.y)
    );

    return distance;
  }

  private setNewFreeRoamingTarget(): void {
    this.freeRoamTarget = this.getRandomPoint();
  }
}
