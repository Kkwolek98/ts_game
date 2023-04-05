import { GlobalSettings } from '../misc/GlobalSettings';
import { Player } from '../entities/Player';
import { UI } from '../ui/UI';
import { GameSettings } from './GameSettings';
import { Enemy } from '../entities/enemies/Enemy';
import { EnemySpawner } from '../entities/enemies/EnemySpawner';
import { Lighting } from '../lighting/Lighting';
import { Client, SpatialHashGrid } from '../collision/SpatialHashGrid';

export class Game {
  public player: Player;
  public enemies: Enemy[] = [];
  public enemyLimit: number = 5;
  public canvas: HTMLCanvasElement;
  public spatialHashGrid: SpatialHashGrid
  public clients: Set<Client> = new Set();

  private ui: UI;
  private enemySpawner: EnemySpawner;
  private lighting: Lighting;
  private playerClient: Client;

  constructor(private settings: GameSettings) {
    if (GlobalSettings.canvasInstances.has('background')) {
      this.canvas = GlobalSettings.canvasInstances.get('background')!;
    } else {
      throw new Error('Background canvas undefined');
    }
    this.player = new Player({ x: 900, y: 900, radius: 10 }, this);
    this.ui = new UI(this);
    this.spatialHashGrid = new SpatialHashGrid({ width: this.canvas.width, height: this.canvas.height }, 300, 300);
    this.enemySpawner = new EnemySpawner(this);
    this.lighting = new Lighting(this);
    this.playerClient = this.spatialHashGrid.newClient(this.player)
    this.clients.add(
      this.playerClient
    );
  }

  start() { }

  animate() {
    this.player?.update();
    this.enemies.forEach((enemy) => enemy.update());
    this.ui.update();
    this.lighting.update();
    this.spatialHashGrid.updateClient(this.playerClient)

    const found = this.spatialHashGrid.findNear(this.playerClient);

    found.forEach((client) => client.entity.debugColor = 'green')

  }
}
