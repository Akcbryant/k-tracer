import {Light} from "./light";
import {Color, Point} from "./tuples";
import {Sphere, WorldObject} from "./sphere";
import {Scaling} from "./matrix";
import {Computations, Intersections, Ray} from "./ray";

export class World {
  light: Light;
  objects: WorldObject[];

  constructor() {
    this.light = new Light(new Point(-10, 10, -10), new Color(1, 1, 1));

    const defaultSphere1 = new Sphere();
    defaultSphere1.material.color = new Color(0.8, 1.0, 0.6);
    defaultSphere1.material.diffuse = 0.7;
    defaultSphere1.material.specular = 0.2;
    const defaultSphere2 = new Sphere();
    defaultSphere2.transform = new Scaling(0.5, 0.5, 0.5);
    this.objects = [defaultSphere1, defaultSphere2];
  }

  public intersect(ray: Ray): Intersections {
    const intersections = this.objects.map(x => {
      return x.intersect(ray);
    }).flatMap(x => x.intersections).sort((a, b) => { return a.t - b.t; });
    return new Intersections(intersections);
  }

  public shadeHit(computations: Computations): Color {
    const isShadowed = this.isShadowed(computations.overPoint);
    return computations.object.material.lighting(
      this.light,
      computations.overPoint,
      computations.eyeV,
      computations.normalV,
      isShadowed);
  }

  public colorAt(ray: Ray): Color {
    const intersections = this.intersect(ray);
    const hit = intersections.hit();

    if (hit !== null) {
      const computations = hit.prepareComputations(ray);
      return this.shadeHit(computations);
    }

    return new Color(0, 0, 0);
  }

  public isShadowed(point: Point): boolean {
    const vector = this.light.position.subtract(point);
    const distance = vector.magnitude();
    const direction = vector.normalize();
    const ray = new Ray(point, direction);
    const intersections = this.intersect(ray);
    const hit = intersections.hit();

    return hit != null && hit.t < distance;
  }
}