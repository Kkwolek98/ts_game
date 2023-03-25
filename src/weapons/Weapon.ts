import { CanvasUtils } from "../canvas-utils/CanvasUtils";
import { Entity } from "../entities/Entity";
import { Bullet } from "./Bullet";

export class Weapon {
  private canvasUtils: CanvasUtils;
  private firedBullet: Bullet | null = null;
  constructor(
    private canvas: HTMLCanvasElement,
    private entity: Entity,
    private damage: number,
  ) {
    this.canvasUtils = new CanvasUtils(this.canvas);
    this.listenForKey();
  }

  public draw(): void {
    if (this.firedBullet) {
      if (this.firedBullet.destroySelf) {
        this.firedBullet = null;
      } else {
        this.firedBullet.draw();
      }
    }
    this.drawSelf();
  }

  private drawSelf(): void {
    this.canvasUtils.setFillStyle('gray');
    this.canvasUtils.drawRectangle(
      { x: this.entity.collision.x - 3, y: this.entity.collision.y  },
      { width: 6, height: 60  },
      this.entity.rotation
    );
    this.canvasUtils.restoreSettings();
  }

  private listenForKey(): void {
    window.addEventListener('keypress', (e) => {
      if (e.code === 'Space') {
        this.fireBullet();
      }
    })
  }

  private fireBullet(): void {
    this.firedBullet = new Bullet(this.entity.collision, 10, 200, this.entity, this.canvas);
  }

}