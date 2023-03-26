import { CanvasUtils } from '../canvas-utils/CanvasUtils';
import { Entity } from '../entities/Entity';
import { Bullet } from './Bullet';

export class Weapon {
  private canvasUtils: CanvasUtils;
  private firedBullets: Bullet[] = [];
  private cooldown: number;
  private lastShootBulletTimestamp: number = (new Date()).getTime();
  private fireKeyPressed: boolean = false;

  constructor(
    private canvas: HTMLCanvasElement,
    private entity: Entity,
    private damage: number,
    bulletsPerSecond: number
  ) {
    this.canvasUtils = new CanvasUtils(this.canvas);
    this.cooldown = 1000 / bulletsPerSecond;
    this.listenForKey();
  }

  public draw(): void {
    this.fireBullet();
    this.drawBullets();
    this.drawSelf();
  }

  private drawSelf(): void {
    this.canvasUtils.setFillStyle('gray');
    this.canvasUtils.drawRectangle(
      { x: this.entity.collision.x - 3, y: this.entity.collision.y },
      { width: 6, height: 60 },
      this.entity.rotation
    );
    this.canvasUtils.restoreSettings();
  }

  private drawBullets(): void {
    if (this.firedBullets.length) {
      this.firedBullets.forEach((bullet, i) => {
        if (bullet.destroySelf) {
          this.firedBullets.splice(i, 1);
        } else {
          bullet.draw();
        }
      });
    }
  }

  private listenForKey(): void {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        this.fireKeyPressed = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        this.fireKeyPressed = false;
      }
    });
  }

  private fireBullet(): void {
    if (!this.fireKeyPressed) return;
    if ((new Date()).getTime() < this.lastShootBulletTimestamp + this.cooldown) return;

    this.firedBullets.push(
      new Bullet(
        this.entity.collision,
        20,
        200,
        this.entity,
        this.canvas
      )
    );

    this.lastShootBulletTimestamp = (new Date()).getTime();
  }
}
