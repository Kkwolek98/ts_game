import { Enemy } from '../entities/enemies/Enemy';
import { Entity } from '../entities/Entity';
import { Player } from '../entities/Player';
import { Game } from '../game/Game';
import { EnemyMovementHandler } from './EnemyMovementHandler';
import { MovementHandler } from './MovementHandler';
import { PlayerMovementHandler } from './PlayerMovementHandler';

export class MovementHandlerFactory {
  public static getHandler(entity: Entity, game: Game): MovementHandler {
    if (entity instanceof Player)
      return new PlayerMovementHandler(entity, game);
    if (entity instanceof Enemy) return new EnemyMovementHandler(entity, game);
    return new MovementHandler(entity, game);
  }
}
