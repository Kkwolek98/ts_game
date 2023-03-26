import { GlobalSettings } from '../misc/GlobalSettings';
import { Player } from '../entities/Player';
import { UI } from '../ui/UI';
import { GameSettings } from './GameSettings';
import { Enemy } from '../entities/enemies/Enemy';
import { EnemySpawner } from '../entities/enemies/EnemySpawner';
import { Lightning } from '../lightning/Lightning';

export class Game {
  public player: Player;
  public enemies: Enemy[] = [];
  public enemyLimit: number = 5;
  public canvas: HTMLCanvasElement;

  private ui: UI;
  private enemySpawner: EnemySpawner;
  private lightning: Lightning;

  constructor(private settings: GameSettings) {
    if (GlobalSettings.canvasInstances.has('background')) {
      this.canvas = GlobalSettings.canvasInstances.get('background')!;
    } else {
      throw new Error('Background canvas undefined');
    }
    this.player = new Player({ x: 900, y: 900, radius: 10 }, this);
    this.ui = new UI(this);
    this.enemySpawner = new EnemySpawner(this);
    this.lightning = new Lightning(this);
  }

  start() { }

  animate() {
    this.player?.update();
    this.enemies.forEach((enemy) => enemy.update());
    this.ui.update();
    this.lightning.update();
  }
}
