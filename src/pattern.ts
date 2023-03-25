import {Color, Point} from "./tuples";
import {IdentityMatrix} from "./matrix";
import {IShape} from "./shape";

export abstract class Pattern {
  a: Color;
  b: Color;
  transform: IdentityMatrix;

  abstract patternAt(point: Point): Color;

  protected constructor(a: Color, b: Color, transform: IdentityMatrix = new IdentityMatrix()) {
    this.a = a;
    this.b = b;
    this.transform = transform;
  }

  patternAtShape(shape: IShape, point: Point): Color {
    const objectPoint = shape.transform.inverse().multiplyByTuple(point);
    const patternPoint = this.transform.inverse().multiplyByTuple(objectPoint);

    return this.patternAt(patternPoint);
  }
}

export class StripePattern extends Pattern {
  constructor(a: Color, b: Color, transform: IdentityMatrix = new IdentityMatrix()) {
    super(a, b, transform);
  }

  patternAt(point: Point): Color {
    if (Math.floor(point.x) % 2 === 0 ) {
      return this.a;
    }
    return this.b;
  }
}

export class GradientPattern extends Pattern{
  constructor(a: Color, b: Color, transform: IdentityMatrix = new IdentityMatrix()) {
    super(a, b, transform);
  }

  patternAt(point: Point): Color {
    const distance = this.b.subtract(this.a);
    const fraction = point.x - Math.floor(point.x);
    return this.a.add(distance.multiply(fraction));
  }
}

export class RingPattern extends Pattern {
  constructor(a: Color, b: Color, transform: IdentityMatrix = new IdentityMatrix()) {
    super(a, b, transform);
  }

  patternAt(point: Point): Color {
    const xSqr = point.x * point.x;
    const zSqr = point.z * point.z;
    if ((Math.floor(Math.sqrt(xSqr + zSqr)) % 2) === 0) {
      return this.a;
    }
    return this.b;
  }
}

export class CheckerPattern extends Pattern {
  constructor(a: Color, b: Color, transform: IdentityMatrix = new IdentityMatrix()) {
    super(a, b, transform);
  }

  patternAt(point: Point): Color {
    const sum = Math.floor(point.x) + Math.floor(point.y) + Math.floor(point.z);
    if (sum % 2 === 0) {
      return this.a;
    }
    return this.b;
  }
}
