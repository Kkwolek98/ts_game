import { CollisionCircle } from "../../collision/CollisionCircle";
import { Game } from "../../game/Game";
import { Dimensions } from "../../misc/interfaces/Point.interface";
import { Enemy } from "./Enemy";

export class EnemySpawner {

  private enemies: Enemy[];
  private gameDimensions: Dimensions;

  constructor(
    private game: Game,
    delay: number = 2500
  ) {
      this.enemies = this.game.enemies;
      this.gameDimensions = { width: this.game.canvas.width, height: this.game.canvas.height };
      this.spawn();
      setInterval(() => {
        if (this.game.enemyLimit > this.enemies.length) {
          this.spawn();
        }
      }, delay);
    }

  private spawn(): void {
    const enemyCollision: CollisionCircle = new CollisionCircle(
      Math.random() * this.gameDimensions.width,
      Math.random() * this.gameDimensions.height,
      Math.random() * 10 + 5
    );
    this.enemies.push( new Enemy(enemyCollision, this.game) );
  }

}