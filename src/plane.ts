import {IShape} from "./shape";
import {IdentityMatrix} from "./matrix";
import {Material} from "./material";
import {Intersection, Intersections, Ray} from "./ray";
import {Point, Vector} from "./tuples";
import {Sphere} from "./sphere";
import {EPSILON} from "./constants";

export class Plane implements IShape {
  public transform = new IdentityMatrix();
  public material = new Material();

  intersect(ray: Ray): Intersections {
    if (Math.abs(ray.direction.y) < EPSILON) {
      return new Intersections([]);
    }
    const t = -ray.origin.y / ray.direction.y;
    return new Intersections([new Intersection(t, this)]);
  }

  normalAt(worldPoint: Point): Vector {
    return new Vector(0, 1, 0);
  }

}