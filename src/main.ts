import { CanvasUtils } from './canvas-utils/CanvasUtils';
import { Game } from './game/Game';
import { GlobalSettings } from './misc/GlobalSettings';

let game: Game;
let frameTime: number;

function init(): void {
  const gameCanvas = document.getElementById('game') as HTMLCanvasElement;
  const uiCanvas = document.getElementById('ui') as HTMLCanvasElement;
  const playerCanvas = document.getElementById('player') as HTMLCanvasElement;
  const lightningCanvas = document.getElementById('lightning') as HTMLCanvasElement;

  gameCanvas.width = 1920;
  gameCanvas.height = 1080;

  uiCanvas.width = 1920;
  uiCanvas.height = 1080;

  playerCanvas.width = 1920;
  playerCanvas.height = 1080;

  lightningCanvas.width = 1920;
  lightningCanvas.height = 1080;

  GlobalSettings.canvasInstances.set('ui', uiCanvas);
  GlobalSettings.canvasInstances.set('background', gameCanvas);
  GlobalSettings.canvasInstances.set('player', playerCanvas);
  GlobalSettings.canvasInstances.set('lightning', lightningCanvas);

  startGame();
  loop(999);
}

function startGame(): void {
  game = Game.getInstance({ fps: 60 });
  game.start();

  frameTime = Math.floor(1000 / game.settings.fps);
}

let lastFrame = 1;

function loop(timestamp: number) {
  const dTime = timestamp - lastFrame;
  if (dTime >= frameTime) {
    lastFrame = timestamp;
    game.settings.lastFrameTime = dTime;
    CanvasUtils.clearAllCanvas(); // TODO: clear only canvas that have changed
    game.animate();
  }
  requestAnimationFrame(loop);
}

window.addEventListener('load', init);
