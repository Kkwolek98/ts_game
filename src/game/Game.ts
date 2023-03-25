import { GlobalSettings } from "../misc/GlobalSettings";
import { Player } from "../entities/Player";
import { UI } from "../ui/UI";
import { GameSettings } from "./GameSettings";
import { Enemy } from "../entities/enemies/Enemy";
import { EnemySpawner } from "../entities/enemies/EnemySpawner";

export class Game {

  public player: Player;
  public enemies: Enemy[] = [];
  public enemyLimit: number = 45;
  public canvas: HTMLCanvasElement;
  private ui: UI;
  private enemySpawner: EnemySpawner;

  constructor(
    private settings: GameSettings
  ) {
    if (GlobalSettings.canvasInstances.has('background')) {
      this.canvas = GlobalSettings.canvasInstances.get('background')!;
    } else {
      throw new Error('Background canvas undefined')
    }
    this.player = new Player({ x: 900, y: 900, radius: 10 }, this);
    this.ui = new UI(this);
    this.enemySpawner = new EnemySpawner(this)
  }

  start() {

  }

  animate() {
    this.player?.update();
    this.enemies.forEach((enemy) => enemy.update())
    this.ui.update();
  }

}