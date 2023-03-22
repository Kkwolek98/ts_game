import { Game } from "../game/Game";
import { GlobalSettings } from "../misc/GlobalSettings";
import { HpBar } from "./HpBar";

export class UI {
  
  public canvas: HTMLCanvasElement = GlobalSettings.canvasInstances.get('ui')!;

  private hpBar: HpBar;

  constructor(
    private game: Game
  ) {
    if (!this.canvas) throw new Error('UI canvas undefined');
    this.hpBar = new HpBar(this.game.player, this.canvas);
  }

  public update() {
    this.hpBar.update();
  }

}