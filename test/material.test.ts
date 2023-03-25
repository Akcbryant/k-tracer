import {Material} from "../src/material";
import {Color, Point, Vector} from "../src/tuples";
import {Light} from "../src/light";
import {StripePattern} from "../src/pattern";
import {Sphere} from "../src/sphere";

describe('material', () => {
  it('uses a default material', () => {
    const material = new Material();

    expect(material.color).toEqual(new Color(1, 1, 1))
    expect(material.ambient).toEqual(0.1);
    expect(material.diffuse).toEqual(0.9);
    expect(material.specular).toEqual(0.9);
    expect(material.shininess).toEqual(200.0);
  });

  describe('lighting', () => {
    let material: Material;
    let position: Point;

    beforeEach(() => {
      material = new Material();
      position = new Point(0, 0, 0);
    });

    it('lights with the eye between the light and surface', () => {
      const eyeV = new Vector(0, 0, -1);
      const normalV = new Vector(0, 0, -1);
      const light = new Light(new Point(0, 0, -10), new Color(1, 1, 1));

      const result = material.lighting(new Sphere(), light, position, eyeV, normalV, false);

      expect(result).toEqual(new Color(1.9, 1.9, 1.9));
    });

    it('lights with the eye between the light and surface, eye offset 45 degrees', () => {
      const eyeV = new Vector(0, Math.sqrt(2)/2, -Math.sqrt(2)/2);
      const normalV = new Vector(0, 0, -1);
      const light = new Light(new Point(0, 0, -10), new Color(1, 1, 1));

      const result = material.lighting(new Sphere(), light, position, eyeV, normalV, false);

      expect(result).toEqual(new Color(1, 1, 1));
    });

    it('lights with the eye between the light and surface, light offset 45 degrees', () => {
      const eyeV = new Vector(0, 0, -1);
      const normalV = new Vector(0, 0, -1);
      const light = new Light(new Point(0, 10, -10), new Color(1, 1, 1));

      const result = material.lighting(new Sphere(), light, position, eyeV, normalV, false);

      const expected = new Color(0.7364, 0.7364, 0.7364)
      expect(result.red).toBeCloseTo(expected.red);
      expect(result.green).toBeCloseTo(expected.green);
      expect(result.blue).toBeCloseTo(expected.blue);
    });

    it('lights with the eye in the path of the reflection vector', () => {
      const eyeV = new Vector(0, -Math.sqrt(2)/2, -Math.sqrt(2)/2);
      const normalV = new Vector(0, 0, -1);
      const light = new Light(new Point(0, 10, -10), new Color(1, 1, 1));

      const result = material.lighting(new Sphere(), light, position, eyeV, normalV, false);

      const expected = new Color(1.6364, 1.6364, 1.6364);
      expect(result.red).toBeCloseTo(expected.red);
      expect(result.green).toBeCloseTo(expected.green);
      expect(result.blue).toBeCloseTo(expected.blue);
    });

    it('lights with the light behind the surface', () => {
      const eyeV = new Vector(0, 0, -1);
      const normalV = new Vector(0, 0, -1);
      const light = new Light(new Point(0, 0, 10), new Color(1, 1, 1));

      const result = material.lighting(new Sphere(), light, position, eyeV, normalV, false);

      expect(result).toEqual(new Color(0.1, 0.1, 0.1));
    });

    it('lights with the surface in shadow', () => {
      const eyeV = new Vector(0, 0, -1);
      const normalV = new Vector(0, 0, -1);
      const light = new Light(new Point(0, 0, -10), new Color(1, 1, 1));

      const result = material.lighting(new Sphere(), light, position, eyeV, normalV, true);

      const expected = new Color(0.1, 0.1, 0.1);
      expect(result.red).toBeCloseTo(expected.red);
      expect(result.green).toBeCloseTo(expected.green);
      expect(result.blue).toBeCloseTo(expected.blue);
    });
  });

  describe('lighting with a pattern applied', () => {
    it('applies pattern color', () => {
      const material = new Material();
      material.pattern = new StripePattern(new Color(1, 1, 1), new Color(0, 0, 0));
      material.ambient = 1;
      material.diffuse = 0;
      material.specular = 0;
      const eyeV = new Vector(0, 0, -1);
      const normalV = new Vector(0, 0, -1);
      const light = new Light(new Point(0, 0, -10), new Color(1, 1, 1));

      const c1 = material.lighting(new Sphere(), light, new Point(0.9, 0, 0), eyeV, normalV, false);
      const c2 = material.lighting(new Sphere(), light, new Point(1.1, 0, 0), eyeV, normalV, false);

      expect(c1).toEqual(new Color(1, 1, 1));
      expect(c2).toEqual(new Color(0, 0, 0));
    });
  });
});
