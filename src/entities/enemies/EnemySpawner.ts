import { CollisionCircle } from '../../collision/CollisionCircle';
import { Game } from '../../game/Game';
import { Dimensions } from '../../misc/interfaces/Point.interface';
import { Enemy } from './Enemy';

export class EnemySpawner {
  private enemies: Enemy[];
  private gameDimensions: Dimensions;

  constructor(private game: Game, delay: number = 2500) {
    this.enemies = this.game.enemies;
    this.gameDimensions = {
      width: this.game.canvas.width,
      height: this.game.canvas.height,
    };
    // this.spawn();
    // setInterval(() => {
    //   if (this.game.enemyLimit > this.enemies.length) {
    //     this.spawn();
    //   }
    // }, delay);
    window.addEventListener('keydown', (e) => {
      if (e.key === 'q') this.spawn();
    })
  }

  public spawn(): void {
    const enemyCollision: CollisionCircle = new CollisionCircle(
      Math.random() * this.gameDimensions.width,
      Math.random() * this.gameDimensions.height,
      Math.random() * 30 + 5
    );
    this.enemies.push(new Enemy(enemyCollision, this.game));
    const client = this.game.spatialHashGrid.newClient(this.enemies[this.enemies.length - 1]);
    this.game.clients.add(client);
  }
}
