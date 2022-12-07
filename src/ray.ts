import {Point, Vector} from "./tuples";
import {IdentityMatrix, Translation} from "./matrix";

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

export class Sphere {

  public transform = new IdentityMatrix();

  intersect(ray: Ray): Intersections {
    const invertedRay = ray.transform(this.transform.inverse());
    const sphereToRay = invertedRay.origin.subtract(new Point(0, 0, 0));
    const a = Vector.dot(invertedRay.direction, invertedRay.direction);
    const b = 2 * Vector.dot(invertedRay.direction, sphereToRay);
    const c = Vector.dot(sphereToRay, sphereToRay) - 1;
    const discriminant = (b*b) - 4 * a * c;
    if (discriminant < 0) { return new Intersections([]); }

    const t1 = new Intersection((-b - Math.sqrt(discriminant)) / (2 * a), this);
    const t2 = new Intersection((-b + Math.sqrt(discriminant)) / (2 * a), this);

    return new Intersections([t1, t2]);
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