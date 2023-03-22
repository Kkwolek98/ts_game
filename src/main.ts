import { CanvasUtils } from "./canvas-utils/CanvasUtils";
import { Game } from "./game/Game";
import { GlobalSettings } from "./misc/GlobalSettings";

let game: Game;

function init(): void {
  const gameCanvas = document.getElementById('game') as HTMLCanvasElement;
  const uiCanvas = document.getElementById('ui') as HTMLCanvasElement;
  const playerCanvas = document.getElementById('player') as HTMLCanvasElement;

  gameCanvas.width = 1920;
  gameCanvas.height = 1080;

  uiCanvas.width = 1920;
  uiCanvas.height = 1080;

  playerCanvas.width = 1920;
  playerCanvas.height = 1080;

  GlobalSettings.canvasInstances.set('ui', uiCanvas);
  GlobalSettings.canvasInstances.set('background', gameCanvas);
  GlobalSettings.canvasInstances.set('player', playerCanvas);

  startGame();
  loop();
}

function startGame(): void {
  game = new Game({ fps: 30 });
  game.start();
}

function loop() {
  CanvasUtils.clearAllCanvas(); // TODO: clear only canvas that have changed
  game.animate();
  requestAnimationFrame(loop);
}

window.addEventListener('load', init);