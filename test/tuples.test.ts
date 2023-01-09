import {Color, Point, Tuple, Vector} from "../src/tuples";

describe('tuples', () => {
  it('creates a point tuple with w=1', () => {
    const result = new Tuple(4.3, -4.2, 3.1, 1);

    expect(result.x).toBe(4.3);
    expect(result.y).toBe(-4.2);
    expect(result.z).toBe(3.1);
    expect(result.w).toBe(1);
    expect(result.isPoint()).toBe(true);
    expect(result.isVector()).toBe(false);
  });

  it('creates a vector tuple with w=0', () => {
    const result = new Tuple(4.3, -4.2, 3.1, 0);

    expect(result.x).toBe(4.3);
    expect(result.y).toBe(-4.2);
    expect(result.z).toBe(3.1);
    expect(result.w).toBe(0);
    expect(result.isPoint()).toBe(false);
    expect(result.isVector()).toBe(true);
  });

  it('adds a vector and a point', () => {
    const point = new Point(3, -2, 5);
    const vector = new Vector(-2, 3, 1);

    const expected = new Tuple(1, 1, 6, 1);

    expect(point.add(vector)).toEqual(expected);
  });

  describe('subtract', () => {
    it('subracts two points', () => {
      const point1 = new Point(3, 2, 1);
      const point2 = new Point(5, 6, 7);

      const expected = new Vector(-2, -4, -6);

      expect(point1.subtract(point2)).toEqual(expected);
    });

    it('subtracts a vector from a point', () => {
      const point = new Point(3, 2, 1);
      const vector = new Vector(5, 6, 7);

      const expected = new Point(-2, -4, -6);

      expect(point.subtract(vector)).toEqual(expected);
    });

    it('subtracts two vectors', () => {
      const vector1 = new Vector(3, 2, 1);
      const vector2 = new Vector(5, 6, 7);

      const expected = new Vector(-2, -4, -6);

      expect(vector1.subtract(vector2)).toEqual(expected);
    });

    it('subtracts from zero vector', () => {
      const zeroVector = new Vector(0, 0, 0);
      const vector = new Vector(1, -2, 3);

      const expected = new Vector(-1, 2, -3);

      expect(zeroVector.subtract(vector)).toEqual(expected);
    });
  });

  it('negates a tuple', () => {
    const tuple = new Tuple(1, -2, 3, -4);

    const expected = new Tuple(-1, 2, -3, 4);

    expect(tuple.negate()).toEqual(expected);
  });

  describe('scalar multiplication and division', () => {
    it('multiplies the tuple value by a scalar value', () => {
      const tuple = new Tuple(1, -2, 3, -4);

      const expected = new Tuple(3.5, -7, 10.5, -14);

      expect(tuple.multiply(3.5)).toEqual(expected);
    });

    it('multiplies the tuple value by a fractional scalar value', () => {
      const tuple = new Tuple(1, -2, 3, -4);

      const expected = new Tuple(0.5, -1, 1.5, -2);

      expect(tuple.multiply(0.5)).toEqual(expected);
    });

    it('divides a tuple by a scalar value', () => {
      const tuple = new Tuple(1, -2, 3, -4);

      const expected = new Tuple(0.5, -1, 1.5, -2);

      expect(tuple.divide(2)).toEqual(expected);
    });
  });

  describe('magnitude - distance away from original point', () => {
    it('computes magnitude of vector (0, 1, 0)', () => {
      const vector = new Vector(0, 1, 0);

      expect(vector.magnitude()).toBe(1);
    });

    it('computes magnitude of vector (0, 0, 1)', () => {
      const vector = new Vector(0, 0, 1);

      expect(vector.magnitude()).toBe(1);
    });

    it('computes magnitude of vector (1, 2, 3)', () => {
      const vector = new Vector(1, 2, 3);

      expect(vector.magnitude()).toBe(Math.sqrt(14));
    });

    it('computes magnitude of vector (-1, -2, -3)', () => {
      const vector = new Vector(-1, -2, -3);

      expect(vector.magnitude()).toBe(Math.sqrt(14));
    });

    describe('normalizing vectors to the unit vector (magnitude = 1)', () => {
      it('normalizes vector (4, 0, 0)', () => {
        const vector = new Vector(4, 0, 0);
        const result = vector.normalize();

        const expected = new Vector(1, 0, 0);

        expect(result).toEqual(expected);
        expect(expected.magnitude()).toBe(1);
      });

      it('normalizes vector (1, 2, 3)', () => {
        const vector = new Vector(1, 2, 3);
        const result = vector.normalize();

        const divisor = Math.sqrt(14);
        const expected = new Vector(1/divisor, 2/divisor, 3/divisor);

        expect(result).toEqual(expected);
        expect(expected.magnitude()).toBe(1);
      });
    });
  });
});

describe('point', () => {
  it('creates a point using super', () => {
    const result = new Point(4, -4, 3);

    const expected = new Tuple(4, -4, 3, 1);

    expect(result).toEqual(expected);
  });
});

describe('vector', () => {
  it('creates a Vector using super', () => {
    const result = new Vector(4, -4, 3);

    const expected = new Tuple(4, -4, 3, 0);

    expect(result).toEqual(expected);
  });

  it('computes the dot product of two vectors', () => {
    const vector1 = new Vector(1, 2, 3);
    const vector2 = new Vector(2, 3, 4);

    expect(Vector.dot(vector1, vector2)).toBe(20);
  });

  it('computes the cross product of two vectors', () => {
    const vector1 = new Vector(1, 2, 3);
    const vector2 = new Vector(2, 3, 4);

    expect(Vector.cross(vector1, vector2)).toEqual(new Vector(-1, 2, -1));
    expect(Vector.cross(vector2, vector1)).toEqual(new Vector(1, -2, 1));
  });

  it('reflects a vector approaching at 45 degrees', () => {
    const vector = new Vector(1, -1, 0);
    const vector2 = new Vector(0, 1, 0);

    const reflectedVector = Vector.reflect(vector, vector2);

    expect(reflectedVector).toEqual(new Vector(1, 1, 0));
  });

  it('reflects a vector off a slanted surface', () => {
    const vector = new Vector(0, -1, 0);
    const vector2 = new Vector(Math.sqrt(2)/2, Math.sqrt(2)/2, 0);

    const reflectedVector = Vector.reflect(vector, vector2);

    const expected = new Vector(1, 0, 0);
    expect(reflectedVector.x).toBeCloseTo(expected.x);
    expect(reflectedVector.y).toBeCloseTo(expected.y);
    expect(reflectedVector.z).toBeCloseTo(expected.z);
  });
});

describe('Colors', () => {
  it('has red green blue getters', () => {
    const color = new Color(-0.5, 0.4, 1.7);

    expect(color.red).toEqual(-0.5);
    expect(color.green).toEqual(0.4);
    expect(color.blue).toEqual(1.7);
  });

  it('adds colors', () => {
    const color1 = new Color(0.9, 0.6, 0.75);
    const color2 = new Color(0.7, 0.1, 0.25);

    const expected = new Color(1.6, 0.7, 1.0);

    expect(color1.add(color2)).toEqual(expected);
  });

  it('subtracts colors', () => {
    const color1 = new Color(0.9, 0.6, 0.75);
    const color2 = new Color(0.7, 0.1, 0.25);
    const subtractedColor = color1.subtract(color2);

    const expected = new Color(0.2, 0.5, 0.5);

    expect(subtractedColor.red).toBeCloseTo(expected.red);
    expect(subtractedColor.green).toBeCloseTo(expected.green);
    expect(subtractedColor.blue).toBeCloseTo(expected.blue);
  });

  it('multiplies colors by a scalar', () => {
    const multipliedColor = new Color(0.2, 0.3, 0.4).multiply(2);

    const expected = new Color(0.4, 0.6, 0.8);

    expect(multipliedColor).toEqual(expected);
  });

  it('multiplies colors', () => {
    const color1 = new Color(1, 0.2, 0.4);
    const color2 = new Color(0.9, 1, 0.1);
    const newColor = Color.hadamardProduct(color1, color2);

    const expected = new Color(0.9, 0.2, 0.04);

    expect(newColor.red).toBeCloseTo(expected.red);
    expect(newColor.green).toBeCloseTo(expected.green);
    expect(newColor.blue).toBeCloseTo(expected.blue);
  });
});
