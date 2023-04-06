export class GameSettings {
  public frameTime: number;
  public lastFrameTime: number = 16;

  private baseFrameTime: number = 16; // 60 fps

  constructor(public fps: number) {
    this.frameTime = Math.floor(1000 / fps);
  }

  public getTimeModifier(): number {
    return this.lastFrameTime / this.baseFrameTime;
  }
}
