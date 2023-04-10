import { GlobalSettings } from '../misc/GlobalSettings';
import { Player } from '../entities/Player';
import { UI } from '../ui/UI';
import { GameSettings } from './GameSettings';
import { Enemy } from '../entities/enemies/Enemy';
import { EnemySpawner } from '../entities/enemies/EnemySpawner';
import { Client, SpatialHashGrid } from '../collision/SpatialHashGrid';
import { CollisionHandler } from '../collision/CollisionHandler';

export class Game {
  //singleton
  private static _instance: Game;
  public static getInstance(settings?: { fps: number }): Game {
    if (!this._instance) {
      this._instance = new Game(settings || { fps: 30 });
    }

    return this._instance;
  }

  public player: Player;
  public enemies: Enemy[] = [];
  public enemyLimit: number = 3;
  public canvas: HTMLCanvasElement;
  public spatialHashGrid: SpatialHashGrid
  public clients: Set<Client> = new Set();
  public settings: GameSettings;

  private ui: UI;
  private collisionHandler: CollisionHandler = new CollisionHandler();
  private enemySpawner: EnemySpawner;
  // private lighting: Lighting;
  private playerClient: Client;

  private constructor(settings: { fps: number }) {
    if (GlobalSettings.canvasInstances.has('background')) {
      this.canvas = GlobalSettings.canvasInstances.get('background')!;
    } else {
      throw new Error('Background canvas undefined');
    }
    this.settings = new GameSettings(settings.fps);
    this.player = new Player({ x: 900, y: 900, radius: 10 }, this);
    this.ui = new UI(this);
    this.spatialHashGrid = new SpatialHashGrid({ width: this.canvas.width, height: this.canvas.height }, 300, 300);
    this.enemySpawner = new EnemySpawner(this);
    // this.lighting = new Lighting(this);
    this.playerClient = this.spatialHashGrid.newClient(this.player)
    this.clients.add(
      this.playerClient
    );
  }

  start() { }

  animate() {
    this.handleCollisions();

    this.enemies.forEach((enemy) => {
      if (enemy.currentHp === 0) {
        this.enemies.splice(this.enemies.findIndex((el) => el === enemy), 1);
        const client = this.spatialHashGrid.clientsByEntity.get(enemy);
        if (client) {
          this.spatialHashGrid.removeClient(client);
          this.clients.delete(client);
        };
      } else {
        enemy.update();
      }
    });
    this.clients.forEach((client) => this.spatialHashGrid.updateClient(client))
    this.player.update();
    this.ui.update();
  }

  handleCollisions() {
    const collisionsDetected: Map<Client, Client> = new Map();

    this.clients.forEach((client) => {
      this.spatialHashGrid.findNear(client).forEach((collidedClient) => {
        if (collisionsDetected.get(client) !== collidedClient) {
          collisionsDetected.set(client, collidedClient);
        }
      });
    });

    collisionsDetected.forEach((client1, client2) => {
      this.collisionHandler.handleCollision(client1.entity, client2.entity);
    });
  }
}
