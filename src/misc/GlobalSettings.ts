type AvailableCanvas = 'background' | 'ui' | 'player';

export class GlobalSettings {
  public static canvasInstances: Map<AvailableCanvas, HTMLCanvasElement> =
    new Map();
  public static getAllCanvasInstances(): HTMLCanvasElement[] {
    return Array.from(GlobalSettings.canvasInstances.values());
  }
}
