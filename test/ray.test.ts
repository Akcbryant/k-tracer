import {Point, Vector} from "../src/tuples";
import {Intersection, Intersections, Ray} from "../src/ray";
import {IdentityMatrix, RotationZ, Scaling, Translation} from "../src/matrix";
import {Sphere} from "../src/sphere";

describe('ray', () => {
  it('creates a ray with origin and direction', () => {
    const origin = new Point(1, 2, 3);
    const direction = new Vector(4, 5, 6);

    const ray = new Ray(origin, direction);

    expect(ray.origin).toEqual(origin);
    expect(ray.direction).toEqual(direction);
  });

  it('computes a point from a distance', () => {
    const ray = new Ray(new Point(2, 3, 4), new Vector(1, 0, 0));

    expect(ray.position(0)).toEqual(new Point(2, 3, 4));
    expect(ray.position(1)).toEqual(new Point(3, 3, 4));
    expect(ray.position(-1)).toEqual(new Point(1, 3, 4));
    expect(ray.position(2.5)).toEqual(new Point(4.5, 3, 4));
  });

  it('translates a ray', () => {
    const ray = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0));
    const translation = new Translation(3, 4, 5);

    const transformedRay = ray.transform(translation);

    expect(transformedRay.origin).toEqual(new Point(4, 6, 8));
    expect(transformedRay.direction).toEqual(new Vector(0, 1, 0));
  });

  it('scales a ray', () => {
    const ray = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0));
    const scaling = new Scaling(2, 3, 4);

    const transformedRay = ray.transform(scaling);

    expect(transformedRay.origin).toEqual(new Point(2, 6, 12));
    expect(transformedRay.direction).toEqual(new Vector(0, 3, 0));
  });
});

describe('Intersection', () => {
  it('encapsulates t and an object', () => {
    const sphere = new Sphere();

    const intersection = new Intersection(3.5, sphere);

    expect(intersection.t).toBe(3.5);
    expect(intersection.object).toBe(sphere);
  });

  it('aggregates intersections', () => {
    const sphere = new Sphere();

    const i1 = new Intersection(1, sphere);
    const i2 = new Intersection(2, sphere);
    const result = new Intersections([i1, i2]);

    expect(result.intersections[0].t).toBe(1);
    expect(result.intersections[1].t).toBe(2);
  });

  it('returns hit when all intersections have positive t', () => {
    const sphere = new Sphere();
    const i1 = new Intersection(1, sphere);
    const i2 = new Intersection(2, sphere);

    const intersections = new Intersections([i2, i1]);

    expect(intersections.hit()).toEqual(i1);
  });

  it('returns hit when some intersections have negative t', () => {
    const sphere = new Sphere();
    const i1 = new Intersection(-1, sphere);
    const i2 = new Intersection(1, sphere);

    const intersections = new Intersections([i2, i1]);

    expect(intersections.hit()).toEqual(i2);
  });

  it('returns hit when all intersections have negative t', () => {
    const sphere = new Sphere();
    const i1 = new Intersection(-2, sphere);
    const i2 = new Intersection(-1, sphere);

    const intersections = new Intersections([i2, i1]);

    expect(intersections.hit()).toEqual(null);
  });

  it('returns lowest nonnegative intersection', () => {
    const sphere = new Sphere();
    const i1 = new Intersection(5, sphere);
    const i2 = new Intersection(7, sphere);
    const i3 = new Intersection(-3, sphere);
    const i4 = new Intersection(2, sphere);

    const intersections = new Intersections([i1, i2, i3, i4]);

    expect(intersections.hit()).toEqual(i4);
  });
});