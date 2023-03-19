import { CanvasUtils } from "./canvas-utils/CanvasUtils";
import { Game } from "./game/Game";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let game: Game;
let canvasUtils: CanvasUtils;

function init(): void {
  canvas = document.getElementById('canvas') as HTMLCanvasElement;
  ctx = canvas.getContext('2d') as CanvasRenderingContext2D; 

  canvas.width = 1920;
  canvas.height = 1080;

  canvasUtils = new CanvasUtils(canvas);

  startGame();
  loop();
}

function startGame(): void {
  game = new Game(canvas, { fps: 30 });
  game.start();
}

function loop() {
  canvasUtils.clearCanvas();
  game.animate();
  requestAnimationFrame(loop);
}

window.addEventListener('load', init);