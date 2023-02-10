import {Plane} from "../src/plane";
import {Point, Vector} from "../src/tuples";
import {Ray} from "../src/ray";

describe('Plane', () => {
  describe('normalAt', () => {
    it('normal of a plane is constant everywhere', () => {
      const plane = new Plane();

      const expected = new Vector(0, 1, 0);

      expect(plane.normalAt(new Point(0, 0, 0))).toEqual(expected);
      expect(plane.normalAt(new Point(10, 0, -10))).toEqual(expected);
      expect(plane.normalAt(new Point(-5, 0,150))).toEqual(expected);
    });
  });

  describe('intersect', () => {
    it('intersects with a ray parallel to the plane', () => {
      const plane = new Plane();
      const ray = new Ray(new Point(0, 10, 0), new Vector(0, 0, 1));

      const intersections = plane.intersect(ray);

      expect(intersections.intersections.length).toBe(0);
    });

    it('intersects with a coplanar ray', () => {
      const plane = new Plane();
      const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));

      const intersections = plane.intersect(ray);

      expect(intersections.intersections.length).toBe(0);
    });

    it('a ray intersecting a plane from above', () => {
      const plane = new Plane();
      const ray = new Ray(new Point(0, 1, 0), new Vector(0, -1, 0));

      const intersections = plane.intersect(ray);

      expect(intersections.intersections.length).toBe(1);
      expect(intersections.intersections[0].t).toBe(1);
      expect(intersections.intersections[0].object).toBe(plane);
    });

    it('a ray intersecting a plane from below', () => {
      const plane = new Plane();
      const ray = new Ray(new Point(0, -1, 0), new Vector(0, 1, 0));

      const intersections = plane.intersect(ray);

      expect(intersections.intersections.length).toBe(1);
      expect(intersections.intersections[0].t).toBe(1);
      expect(intersections.intersections[0].object).toBe(plane);
    });
  });
});