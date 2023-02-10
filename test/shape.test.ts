import {IdentityMatrix} from "../src/matrix";
import {Material} from "../src/material";
import {Sphere} from "../src/sphere";

describe('IShape', () => {
  describe('initialization', () => {
    it('has a default identity matrix transformation', () => {
      const shape = new Sphere();

      expect(shape.transform).toEqual(new IdentityMatrix());
    });

    it('defaults to a new material', () => {
      const shape = new Sphere();

      expect(shape.material).toEqual(new Material());
    });
  });
});