import {IdentityMatrix} from "./matrix";
import {Point, Vector} from "./tuples";
import {Intersection, Intersections, Ray} from "./ray";
import {Material} from "./material";
import {IShape} from "./shape";

export class Sphere implements IShape {
  public transform = new IdentityMatrix();
  public material = new Material();

  intersect(ray: Ray): Intersections {
    const invertedRay = ray.transform(this.transform.inverse());
    const sphereToRay = invertedRay.origin.subtract(new Point(0, 0, 0));
    const a = Vector.dot(invertedRay.direction, invertedRay.direction);
    const b = 2 * Vector.dot(invertedRay.direction, sphereToRay);
    const c = Vector.dot(sphereToRay, sphereToRay) - 1;
    const discriminant = (b * b) - 4 * a * c;
    if (discriminant < 0) {
      return new Intersections([]);
    }

    const t1 = new Intersection((-b - Math.sqrt(discriminant)) / (2 * a), this);
    const t2 = new Intersection((-b + Math.sqrt(discriminant)) / (2 * a), this);

    return new Intersections([t1, t2]);
  }

  normalAt(worldPoint: Point): Vector {
    const objectPoint = this.transform.inverse().multiplyByTuple(worldPoint)
    const objectNormal = objectPoint.subtract(new Point(0, 0, 0));
    const worldNormal = this.transform.inverse().transpose().multiplyByTuple(objectNormal);
    worldNormal.w = 0;
    return worldNormal.normalize();
  }
}