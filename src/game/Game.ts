import { Player } from "../player/Player";
import { UI } from "../ui/UI";
import { GameSettings } from "./GameSettings";

export class Game {

  public player: Player;

  private ui: UI;

  constructor(
    public canvas: HTMLCanvasElement,
    private settings: GameSettings
  ) {
    this.player = new Player(this, { x: 900, y: 900, radius: 10 }, this.canvas);
    this.ui = new UI(this);
  }

  start() {

  }

  animate() {
    this.player?.update();
    this.ui.update();
  }

}