import {Point, Vector} from "./tuples";
import {Translation} from "./matrix";

export class Ray {
  origin: Point;
  direction: Vector;

  constructor(origin: Point, direction: Vector) {
    this.origin = origin;
    this.direction = direction;
  }

  position(t: number): Point {
    return this.origin.add(this.direction.multiply(t));
  }

  transform(translation: Translation): Ray {
    const point = translation.multiplyByTuple(this.origin);
    const direction = translation.multiplyByTuple(this.direction);
    return new Ray(point, direction)
  }
}

export class Intersection {
  t: number;
  object: any;

  constructor(t: number, object: any) {
    this.t = t;
    this.object = object;
  }
}

export class Intersections {
  intersections: Intersection[];

  constructor(intersections: Intersection[]) {
    this.intersections = intersections;
  }

  hit(): Intersection | null {
    const lowestNonNegative = Math.min(...this.intersections.filter(x => x.t >= 0).map(x => x.t));

    return this.intersections.find(x => x.t === lowestNonNegative) ?? null;
  }
}