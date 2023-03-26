import { Enemy } from '../entities/enemies/Enemy';
import { Game } from '../game/Game';
import { angleToVector } from '../misc/consts/angleUtils';
import { MovementHandler } from './MovementHandler';

export class EnemyMovementHandler extends MovementHandler {

  private detectionRadius = 450;

  constructor(entity: Enemy, game: Game) {
    super(entity, game);
  }

  public override move(): void {
    const distanceToPlayer = this.getDistanceToPlayer();
    const isTouchingPlayer = distanceToPlayer >= (this.game.player.collision.radius + this.entity.collision.radius);
    const isInDetectionRadius = distanceToPlayer <= this.detectionRadius;

    if (isTouchingPlayer && isInDetectionRadius) {
      this.followPlayer();
    }
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

  private getDistanceToPlayer(): number {
    const distance = Math.hypot(
      Math.abs(this.game?.player.collision.x - this.entity.collision.x),
      Math.abs(this.game?.player.collision.y - this.entity.collision.y)
    );

    return distance;
  }
}
