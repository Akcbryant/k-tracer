import {IdentityMatrix} from "./matrix";
import {Material} from "./material";
import {Intersections, Ray} from "./ray";
import {Point, Vector} from "./tuples";

export interface IShape {
  transform: IdentityMatrix;
  material: Material;
  intersect(ray: Ray): Intersections;
  normalAt(worldPoint: Point): Vector;
}