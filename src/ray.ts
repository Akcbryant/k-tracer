import {Point, Vector} from "./tuples";
import {Translation} from "./matrix";
import {WorldObject} from "./sphere";

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
  object: WorldObject;

  constructor(t: number, object: WorldObject) {
    this.t = t;
    this.object = object;
  }

  prepareComputations(ray: Ray): Computations {
    const point = ray.position(this.t);
    const normalV = this.object.normalAt(point);
    const eyeV = ray.direction.negate();
    const isInside = Vector.dot(normalV, eyeV) < 0;
    return {
      t: this.t,
      object: this.object,
      point: point,
      eyeV: eyeV,
      normalV: isInside ? normalV.negate() : normalV,
      inside: isInside
    }
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

export class Computations {
  t!: number;
  object!: WorldObject;
  point!: Point;
  eyeV!: Point;
  normalV!: Point;
  inside!: boolean;
}