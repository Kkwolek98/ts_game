import { Player } from "../player/Player";
import { GameSettings } from "./GameSettings";

export class Game {

  private player: Player;

  constructor(
    private canvas: HTMLCanvasElement,
    private settings: GameSettings
  ) {
    this.player = new Player(this, { x: 900, y: 900, radius: 10 }, this.canvas);
  }

  start() {

  }

  animate() {
    this.player?.update();
  }

}