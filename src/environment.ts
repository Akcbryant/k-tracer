import {Vector} from "./tuples";

export class Environment {
  public gravity: Vector;
  public wind: Vector;

  constructor(gravity: Vector, wind: Vector) {
    this.gravity = gravity;
    this.wind = wind;
  }
}