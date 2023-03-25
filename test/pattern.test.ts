import {CheckerPattern, GradientPattern, Pattern, RingPattern, StripePattern} from "../src/pattern";
import {Color, Point} from "../src/tuples";
import {Sphere} from "../src/sphere";
import {Scaling, Translation} from "../src/matrix";

describe('StripePattern', () => {
  const white = new Color(0, 0, 0);
  const black = new Color(1, 1, 1);

  it('sets colors a and b from constructor', () => {
    const pattern = new StripePattern(white, black);

    expect(pattern.a).toEqual(white);
    expect(pattern.b).toEqual(black);
  });

  describe('stripeAt', () =>  {
    it('is constant in y', () => {
      const pattern = new StripePattern(white, black);

      expect(pattern.patternAt(new Point(0, 0, 0))).toEqual(white);
      expect(pattern.patternAt(new Point(0, 1, 0))).toEqual(white);
      expect(pattern.patternAt(new Point(0, 2, 0))).toEqual(white);
    });

    it('is constant in z', () => {
      const pattern = new StripePattern(white, black);

      expect(pattern.patternAt(new Point(0, 0, 0))).toEqual(white);
      expect(pattern.patternAt(new Point(0, 0, 1))).toEqual(white);
      expect(pattern.patternAt(new Point(0, 0, 2))).toEqual(white);
    });

    it('alternates in x', () => {
      const pattern = new StripePattern(white, black);

      expect(pattern.patternAt(new Point(0, 0, 0))).toEqual(white);
      expect(pattern.patternAt(new Point(0.9, 0, 0))).toEqual(white);
      expect(pattern.patternAt(new Point(1, 0, 0))).toEqual(black);
      expect(pattern.patternAt(new Point(-0.1, 0, 0))).toEqual(black);
      expect(pattern.patternAt(new Point(-1, 0, 0))).toEqual(black);
      expect(pattern.patternAt(new Point(-1.1, 0, 0))).toEqual(white);
    });
  });

  describe('patternAtShape', () => {
    it('returns color for stripes with an object transformation', () => {
      const object = new Sphere();
      object.transform = new Scaling(2, 2, 2);
      const pattern = new StripePattern(white, black);

      const result = pattern.patternAtShape(object, new Point(1.5, 0, 0))

      expect(result).toEqual(white);
    });

    it('returns color for stripes with a pattern transformation', () => {
      const object = new Sphere();
      const pattern = new StripePattern(white, black);
      pattern.transform = new Scaling(2, 2, 2);

      const result = pattern.patternAtShape(object, new Point(1.5, 0, 0))

      expect(result).toEqual(white);
    });

    it('returns color for stripes with a pattern and object transformation', () => {
      const object = new Sphere();
      object.transform = new Scaling(2, 2, 2);
      const pattern = new StripePattern(white, black);
      pattern.transform = new Translation(0.5, 0, 0);

      const result = pattern.patternAtShape(object, new Point(2.5, 0, 0))

      expect(result).toEqual(white);
    });
  });
});

describe('GradientPattern', () => {
  const white = new Color(1, 1, 1);
  const black = new Color(0, 0, 0);

  it('linearly interpolates between colors', () => {
    const pattern = new GradientPattern(white, black);

    expect(pattern.patternAt(new Point(0, 0, 0))).toEqual(white);
    expect(pattern.patternAt(new Point(0.25, 0, 0))).toEqual(new Color(0.75, 0.75, 0.75));
    expect(pattern.patternAt(new Point(0.5, 0, 0))).toEqual(new Color(0.5, 0.5, 0.5));
    expect(pattern.patternAt(new Point(0.75, 0, 0))).toEqual(new Color(0.25, 0.25, 0.25));
  });
});

describe('RingPattern', () => {
  const white = new Color(1, 1, 1);
  const black = new Color(0, 0, 0);

  it('linearly interpolates between colors', () => {
    const pattern = new RingPattern(white, black);

    expect(pattern.patternAt(new Point(0, 0, 0))).toEqual(white);
    expect(pattern.patternAt(new Point(1, 0, 0))).toEqual(black);
    expect(pattern.patternAt(new Point(0, 0, 1))).toEqual(black);
    expect(pattern.patternAt(new Point(0.708, 0, 0.708))).toEqual(black);
  });
});

describe('CheckerPattern', () => {
  const white = new Color(1, 1, 1);
  const black = new Color(0, 0, 0);

  it('checkers should repeat in x', () => {
    const pattern = new CheckerPattern(white, black);

    expect(pattern.patternAt(new Point(0, 0, 0))).toEqual(white);
    expect(pattern.patternAt(new Point(0.99, 0, 0))).toEqual(white);
    expect(pattern.patternAt(new Point(1.01, 0, 0))).toEqual(black);
  });

  it('checkers should repeat in y', () => {
    const pattern = new CheckerPattern(white, black);

    expect(pattern.patternAt(new Point(0, 0, 0))).toEqual(white);
    expect(pattern.patternAt(new Point(0, 0.99, 0))).toEqual(white);
    expect(pattern.patternAt(new Point(0, 1.01, 0))).toEqual(black);
  });

  it('checkers should repeat in z', () => {
    const pattern = new CheckerPattern(white, black);

    expect(pattern.patternAt(new Point(0, 0, 0))).toEqual(white);
    expect(pattern.patternAt(new Point(0, 0, 0.99))).toEqual(white);
    expect(pattern.patternAt(new Point(0, 0, 1.01))).toEqual(black);
  });
});