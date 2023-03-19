import { Game } from "../game/Game";
import { HpBar } from "./HpBar";

export class UI {
  
  public static canvas: HTMLCanvasElement; 

  private hpBar: HpBar;

  constructor(
    private game: Game
  ) {
    this.hpBar = new HpBar(this.game.player, UI.canvas);
  }

  public update() {
    this.hpBar.update();
  }

}