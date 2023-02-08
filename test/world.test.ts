import {World} from "../src/world";
import {Sphere} from "../src/sphere";
import {Color, Point, Vector} from "../src/tuples";
import {Scaling, Translation} from "../src/matrix";
import {Light} from "../src/light";
import {Intersection, Ray} from "../src/ray";

describe('World', () => {
  it('has a default world with two spheres', () => {
    const expectedLight = new Light(new Point(-10, 10, -10), new Color(1, 1, 1))
    const expectedSphere1 = new Sphere();
    expectedSphere1.material.color = new Color(0.8, 1.0, 0.6);
    expectedSphere1.material.diffuse = 0.7;
    expectedSphere1.material.specular = 0.2;
    const expectedSphere2 = new Sphere();
    expectedSphere2.transform = new Scaling(0.5, 0.5, 0.5);

    const world = new World();

    expect(world.light).toEqual(expectedLight);
    expect(world.objects).toContainEqual(expectedSphere1);
    expect(world.objects).toContainEqual(expectedSphere2);
  });

  it('intersects a world with a ray', () => {
    const world = new World();
    const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));

    const result = world.intersect(ray);

    expect(result.intersections.length).toBe(4);
    expect(result.intersections[0].t).toBe(4);
    expect(result.intersections[1].t).toBe(4.5);
    expect(result.intersections[2].t).toBe(5.5);
    expect(result.intersections[3].t).toBe(6);
  });

  describe('shadeHit', () => {
    it('shades an intersection', () => {
      const world = new World();
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
      const shape = world.objects[0];
      const intersection = new Intersection(4, shape);

      const computations = intersection.prepareComputations(ray);
      const result = world.shadeHit(computations);

      expect(result.red).toBeCloseTo(0.38066);
      expect(result.green).toBeCloseTo(0.47583);
      expect(result.blue).toBeCloseTo(0.2855);
    });

    it('shades an intersection from the inside', () => {
      const world = new World();
      world.light = new Light(new Point(0, 0.25, 0), new Color(1, 1, 1));
      const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));
      const shape = world.objects[1];
      const intersection = new Intersection(0.5, shape);

      const computations = intersection.prepareComputations(ray);
      const result = world.shadeHit(computations);

      expect(result.red).toBeCloseTo(0.90498);
      expect(result.green).toBeCloseTo(0.90498);
      expect(result.blue).toBeCloseTo(0.90498);
    });

    it('is given an intersection in shadow', () => {
      const world = new World();
      world.light = new Light(new Point(0, 0, -10), new Color(1, 1, 1))
      const sphere1 = new Sphere();
      world.objects.push(sphere1);
      const sphere2 = new Sphere();
      sphere2.transform = new Translation(0, 0, 10);
      world.objects.push(sphere2);
      const ray = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1));
      const intersection = new Intersection(4, sphere2);
      const comps = intersection.prepareComputations(ray);

      const result = world.shadeHit(comps);

      expect(result).toEqual(new Color(0.1, 0.1, 0.1));
    });
  });

  describe('colorAt', () => {
    it('returns a color when a ray misses', () => {
      const world = new World();
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 1, 0));

      const result = world.colorAt(ray);

      expect(result).toEqual(new Color(0, 0, 0));
    });

    it('returns a color when a ray hits', () => {
      const world = new World();
      const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));

      const result = world.colorAt(ray);

      expect(result.red).toBeCloseTo(0.38066);
      expect(result.green).toBeCloseTo(0.47583);
      expect(result.blue).toBeCloseTo(0.2855);
    });

    it('returns a color with an intersection behind the ray', () => {
      const world = new World();
      const outer = world.objects[0];
      outer.material.ambient = 1;
      const inner = world.objects[1];
      inner.material.ambient = 1;
      const ray = new Ray(new Point(0, 0, 0.75), new Vector(0, 0, -1));

      const result = world.colorAt(ray);

      expect(result).toEqual(inner.material.color);
    });
  });

  describe('isShadowed', () => {
    it('returns false when there is no shadow when nothing is collinear with point and light', () => {
      const world = new World();

      const point = new Point(0, 10, 0);

      expect(world.isShadowed(point)).toBe(false);
    });

    it('returns true when an object is between the point and the light', () => {
      const world = new World();

      const point = new Point(10, -10, 10);

      expect(world.isShadowed(point)).toBe(true);
    });

    it('returns false when there is no shadow when an object is behind the light', () => {
      const world = new World();

      const point = new Point(-20, 20, 20);

      expect(world.isShadowed(point)).toBe(false);
    });

    it('returns false when an object is behind the point', () => {
      const world = new World();

      const point = new Point(-2, 2, 2);

      expect(world.isShadowed(point)).toBe(false);
    });
  });
});