import {Color, Point} from "./tuples";

export class Light {
  public position: Point;
  public intensity: Color;

  constructor(position: Point, intensity: Color) {
    this.position = position;
    this.intensity = intensity;
  }
}