import {Ray} from "../src/ray";
import {Sphere} from "../src/sphere";
import {IdentityMatrix, RotationZ, Scaling, Translation} from "../src/matrix";
import {Point, Vector} from "../src/tuples";
import {Material} from "../src/material";

describe('sphere', () => {
  it('intersects a sphere at two points', () => {
    const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));

    const sphere = new Sphere();
    const xs = sphere.intersect(ray);

    expect(xs.intersections.length).toBe(2);
    expect(xs.intersections[0].t).toBe(4);
    expect(xs.intersections[1].t).toBe(6);
  });

  it('intersect sets the object on the intersection', () => {
    const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));

    const sphere = new Sphere();
    const xs = sphere.intersect(ray);

    expect(xs.intersections.length).toBe(2);
    expect(xs.intersections[0].object).toBe(sphere);
    expect(xs.intersections[1].object).toBe(sphere);
  });

  it('intersects a sphere at a tangent', () => {
    const ray = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1));

    const sphere = new Sphere();
    const xs = sphere.intersect(ray);

    expect(xs.intersections.length).toBe(2);
    expect(xs.intersections[0].t).toBe(5);
    expect(xs.intersections[1].t).toBe(5);
  });

  it('misses a sphere', () => {
    const ray = new Ray(new Point(0, 2, -5), new Vector(0, 0, 1));

    const sphere = new Sphere();
    const xs = sphere.intersect(ray);

    expect(xs.intersections.length).toBe(0);
  });

  it('returns two intersections when a ray originates inside a sphere', () => {
    const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));

    const sphere = new Sphere();
    const xs = sphere.intersect(ray);

    expect(xs.intersections.length).toBe(2);
    expect(xs.intersections[0].t).toBe(-1);
    expect(xs.intersections[1].t).toBe(1);
  });

  it('returns two intersections when a ray originates outside a sphere', () => {
    const ray = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1));

    const sphere = new Sphere();
    const xs = sphere.intersect(ray);

    expect(xs.intersections.length).toBe(2);
    expect(xs.intersections[0].t).toBe(-6);
    expect(xs.intersections[1].t).toBe(-4);
  });

  it('has a default transform equal to the identity matrix', () => {
    const sphere = new Sphere();

    expect(sphere.transform).toEqual(new IdentityMatrix());
  });

  it('can set a spheres transform', () => {
    const sphere = new Sphere();

    const expectedTransform = new Translation(2, 3, 4);
    sphere.transform = expectedTransform;

    expect(sphere.transform).toEqual(expectedTransform);
  });

  it('intersects a scaled sphere with a ray', () => {
    const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
    const sphere = new Sphere();
    sphere.transform = new Scaling(2, 2, 2);

    const xs = sphere.intersect(ray);

    expect(xs.intersections.length).toBe(2);
    expect(xs.intersections[0].t).toBe(3);
    expect(xs.intersections[1].t).toBe(7);
  });

  it('intersects a translated sphere with a ray', () => {
    const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
    const sphere = new Sphere();
    sphere.transform = new Translation(5, 0, 0);

    const xs = sphere.intersect(ray);

    expect(xs.intersections.length).toBe(0);
  });

  it('computes the normal on a sphere at a point on the x axis', () => {
    const sphere = new Sphere();

    expect(sphere.normalAt(new Point(1, 0, 0))).toEqual(new Vector(1, 0, 0));
  });

  it('computes the normal on a sphere at a point on the y axis', () => {
    const sphere = new Sphere();

    expect(sphere.normalAt(new Point(0, 1, 0))).toEqual(new Vector(0, 1, 0));
  });

  it('computes the normal on a sphere at a point on the z axis', () => {
    const sphere = new Sphere();

    expect(sphere.normalAt(new Point(0, 0, 1))).toEqual(new Vector(0, 0, 1));
  });

  it('computes the normal on a sphere at a nonaxial point', () => {
    const sphere = new Sphere();

    const value = Math.sqrt(3)/3;
    expect(sphere.normalAt(new Point(value, value, value))).toEqual(new Vector(value, value, value));
  });

  it('the normal is a normalized vector', () => {
    const sphere = new Sphere();

    const value = Math.sqrt(3)/3;
    const normal = sphere.normalAt(new Point(value, value, value));
    expect(normal).toEqual(normal.normalize());
  });

  it('computes the normal on a translated sphere', () => {
    const sphere = new Sphere();
    sphere.transform = new Translation(0, 1, 0);

    const result = sphere.normalAt(new Point(0, 1.70711, -0.70711));

    const expected = new Vector(0, 0.70711, -0.70711);
    expect(result.x).toBeCloseTo(expected.x);
    expect(result.y).toBeCloseTo(expected.y);
    expect(result.z).toBeCloseTo(expected.z);
  });

  it('computes the normal on a transformed sphere', () => {
    const sphere = new Sphere();
    sphere.transform = (new Scaling(1, 0.5, 1).multiply(new RotationZ(Math.PI / 5)));

    const result = sphere.normalAt(new Point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2))

    const expected = new Vector(0, 0.97014, -0.24254)
    expect(result.x).toBeCloseTo(expected.x);
    expect(result.y).toBeCloseTo(expected.y);
    expect(result.z).toBeCloseTo(expected.z);
  });

  it('has a default material', () => {
    const sphere = new Sphere();

    expect(sphere.material).toEqual(new Material());
  });

  it('can set a material', () => {
    const sphere = new Sphere();
    const material = new Material();
    material.ambient = 1;

    sphere.material = material;

    expect(sphere.material).toEqual(material);
  });
});
