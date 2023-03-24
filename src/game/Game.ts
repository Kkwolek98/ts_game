import { GlobalSettings } from "../misc/GlobalSettings";
import { Player } from "../entities/Player";
import { UI } from "../ui/UI";
import { GameSettings } from "./GameSettings";

export class Game {

  public player: Player;
  public canvas: HTMLCanvasElement;
  private ui: UI;

  constructor(
    private settings: GameSettings
  ) {
    if (GlobalSettings.canvasInstances.has('background')) {
      this.canvas = GlobalSettings.canvasInstances.get('background')!;
    } else {
      throw new Error('Background canvas undefined')
    }
    this.player = new Player(this, { x: 900, y: 900, radius: 10 });
    this.ui = new UI(this);
  }

  start() {

  }

  animate() {
    this.player?.update();
    this.ui.update();
  }

}