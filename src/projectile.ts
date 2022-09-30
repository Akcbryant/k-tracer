import {Point, Vector} from "./tuples";

export class Projectile {
  public position: Point;
  public velocity: Vector;

  constructor(position: Point, velocity: Vector) {
    this.position = position;
    this.velocity = velocity;
  }
}