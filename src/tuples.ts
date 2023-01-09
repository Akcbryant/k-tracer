export class Tuple {
  public x: number;
  public y: number;
  public z: number;
  public w: TupleType;

  get points(): any[] {
    return [this.x, this.y, this.z, this.w];
  };

  constructor(x: number, y: number, z: number, tupleType: TupleType) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = tupleType;
  }

  isPoint(): boolean {
    return this.w === TupleType.Point;
  }

  isVector(): boolean {
    return this.w === TupleType.Vector;
  }

  add(tuple: Tuple): Tuple {
    return new Tuple(this.x + tuple.x,
      this.y + tuple.y,
      this.z + tuple.z,
      this.w + tuple.w);
  }

  subtract(tuple: Tuple): Tuple {
    return new Tuple(this.x - tuple.x,
      this.y - tuple.y,
      this.z - tuple.z,
      this.w - tuple.w);
  }

  negate(): Tuple {
    return new Tuple(-this.x, -this.y, -this.z, -this.w);
  }

  multiply(scalar: number): Tuple {
    return new Tuple(this.x * scalar,
      this.y * scalar,
      this.z * scalar,
      this.w * scalar);
  }

  divide(scalar: number): Tuple {
    return new Tuple(this.x / scalar,
      this.y / scalar,
      this.z / scalar,
      this.w / scalar);
  }

  magnitude(): number {
    const sumOfSquares = (this.x * this.x)
      + (this.y * this.y)
      + (this.z * this.z)
      + (this.w * this.w);

    return Math.sqrt(sumOfSquares)
  }

  normalize(): Tuple {
    return new Tuple(this.x / this.magnitude(),
      this.y / this.magnitude(),
      this.z / this.magnitude(),
      this.w / this.magnitude());
  }
}

export class Point extends Tuple {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, TupleType.Point);
  }
}

export class Vector extends Tuple {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, TupleType.Vector);
  }

  static dot(a: Vector, b: Vector): number {
    return (a.x * b.x) + (a.y * b.y) + (a.z * b.z) + (a.w * b.w);
  }

  static cross(a: Vector, b: Vector): Vector {
    return new Vector(a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x)
  }

  static reflect(inVector: Vector, normalVector: Vector): Vector {
    const subtractValue = normalVector.multiply(2).multiply(Vector.dot(inVector, normalVector));
    return inVector.subtract(subtractValue);
  }
}

export class Color extends Tuple {

  red: number;
  green: number;
  blue: number;

  constructor(red: number, green: number, blue: number) {
    super(0, 0, 0, TupleType.Point);
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  static hadamardProduct(color1: Color, color2: Color) {
    return new Color(color1.red * color2.red,
      color1.green * color2.green,
      color1.blue * color2.blue)
  }

  subtract(color: Color): Color {
    return new Color(this.red - color.red,
      this.green - color.green,
      this.blue - color.blue);
  }

  multiply(scalar: number): Color {
    return new Color(this.red * scalar,
      this.green * scalar,
      this.blue * scalar);
  }

  add(color: Color): Color {
    return new Color(this.red + color.red,
      this.green + color.green,
      this.blue + color.blue);
  }
}

export enum TupleType {
  Vector = 0,
  Point = 1,
}