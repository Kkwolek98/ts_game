import { Entity } from "../entities/Entity";
import { math } from "../math";
import { Dimensions, Point } from "../misc/interfaces/Point.interface";
import { Movable } from "../movement/interfaces/Movable.interface";
import { CollisionCircle } from "./CollisionCircle";

export interface Client {
  entity: Movable,
  indices: number[][]
}

export class SpatialHashGrid {

  private cells: Set<Client>[][] = [];

  constructor(
    private dimensions: Dimensions,
    private cellWidth: number,
    private cellHeight: number
  ) {
    const [cellsX, cellsY] = this.calculateGridDimensions(this.dimensions, this.cellWidth, this.cellHeight);
    this.generateCells(cellsX, cellsY);
    console.log(this.cells)
  }

  public newClient(entity: Movable): Client {
    const client: Client = {
      entity,
      indices: [],
    };

    this.insertClient(client);

    return client;
  }

  public updateClient(client: Client): void {
    this.removeClient(client);
    this.insertClient(client);
    (client.entity as Entity).debugColor = undefined;
  }

  public removeClient(client: Client): void {
    client.indices.forEach(([x, y]) => {
      this.cells[y][x].delete(client);
    });
  }

  public findNear(client: Client, outerCellsNumber: number = 1): Set<Client> {
    const nearClients: Set<Client> = new Set();

    client.indices.forEach(([x, y]) => {
      this.cells[y][x].forEach((client) => nearClients.add(client));
    });

    nearClients.delete(client);

    return nearClients;
  }

  private insertClient(client: Client): void {
    const indices = this.getClientIndices(client);
    client.indices = indices;

    indices.forEach(([x, y]) => {
      this.cells[y]?.[x].add(client); // TODO: There's a bug, client indices aren't correct
    });
  }

  private getClientIndices(client: Client): number[][] {
    const [boundsStart, boundsEnd] = this.getClientIndicesBounds(client);

    const indices = [];

    for (let y = boundsStart[1]; y <= boundsEnd[1]; y++) {
      for (let x = boundsStart[0]; x <= boundsEnd[0]; x++) {
        indices.push([x, y]);
      }
    }


    return indices;
  }

  private getClientIndicesBounds(client: Client): number[][] {
    const entity = client.entity;
    let entityBounds;
    // if (client.entity.collision instanceof CollisionCircle) { // TODO: In case of different collision shapes
    entityBounds = [
      { min: Math.max(entity.collision.x - entity.collision.radius, 0), max: Math.min(entity.collision.x + entity.collision.radius, this.dimensions.width) }, // x bounds
      { min: Math.max(entity.collision.y - entity.collision.radius, 0), max: Math.min(entity.collision.y + entity.collision.radius, this.dimensions.height) }, // y bounds
    ];
    // }

    const firstCellX = Math.floor(Math.abs(entityBounds[0].min / this.cellWidth));
    const lastCellX = Math.floor(Math.abs(entityBounds[0].max / this.cellWidth));
    const firstCellY = Math.floor(Math.abs(entityBounds[1].min / this.cellHeight));
    const lastCellY = Math.floor(Math.abs(entityBounds[1].max / this.cellHeight));

    return [[firstCellX, firstCellY], [lastCellX, lastCellY]];
  }

  private calculateGridDimensions(dimensions: Dimensions, cellWidth: number, cellHeight: number) {
    return [Math.ceil(dimensions.width / cellWidth), Math.ceil(dimensions.height / cellHeight)];
  }

  private generateCells(cellsX: number, cellsY: number): void {
    for (let y = 0; y < cellsY; y++) {
      this.cells.push([]);
      for (let x = 0; x < cellsX; x++) {
        this.cells[y].push(new Set());
      }
    }
  }

}