import { CanvasUtils } from "./canvas-utils/CanvasUtils";
import { Game } from "./game/Game";
import { UI } from "./ui/UI";

let gameCanvas: HTMLCanvasElement;
let uiCanvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let game: Game;
let canvasUtils: CanvasUtils;

function init(): void {
  gameCanvas = document.getElementById('game') as HTMLCanvasElement;
  uiCanvas = document.getElementById('ui') as HTMLCanvasElement;
  ctx = gameCanvas.getContext('2d') as CanvasRenderingContext2D; 

  gameCanvas.width = 1920;
  gameCanvas.height = 1080;

  uiCanvas.width = 1920;
  uiCanvas.height = 1080;

  UI.canvas = uiCanvas;

  canvasUtils = new CanvasUtils(gameCanvas);

  startGame();
  loop();
}

function startGame(): void {
  game = new Game(gameCanvas, { fps: 30 });
  game.start();
}

function loop() {
  canvasUtils.clearCanvas();
  game.animate();
  requestAnimationFrame(loop);
}

window.addEventListener('load', init);