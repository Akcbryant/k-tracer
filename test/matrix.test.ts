import {IdentityMatrix, Matrix, RotationX, RotationY, RotationZ, Scaling, Shearing, Translation} from "../src/matrix";
import {Point, Tuple, Vector} from "../src/tuples";

describe('Matrix', () => {
  it('initializes a 4x4 matrix', () => {
    const points = [
      [1, 2, 3, 4],
      [5.5, 6.5, 7.5, 8.5],
      [9, 10, 11, 12],
      [13.5, 14.5, 15.5, 16.5]
    ];

    const matrix = new Matrix(points);

    expect(matrix.points[0][0]).toBe(1);
    expect(matrix.points[0][3]).toBe(4);
    expect(matrix.points[1][0]).toBe(5.5);
    expect(matrix.points[1][2]).toBe(7.5);
    expect(matrix.points[2][2]).toBe(11);
    expect(matrix.points[3][0]).toBe(13.5);
    expect(matrix.points[3][2]).toBe(15.5);
  });

  it('initializes 3x3 matrix', () => {
    const points = [
      [-3, 5, 8],
      [1, -2, -7],
      [0, 1, 1]
    ];

    const matrix = new Matrix(points);

    expect(matrix.points[0][0]).toBe(-3);
    expect(matrix.points[1][1]).toBe(-2);
    expect(matrix.points[2][2]).toBe(1);
  });

  it('initializes 2x2 matrix', () => {
    const points = [
      [-3, 5],
      [1, -2]
    ]

    const matrix = new Matrix(points);

    expect(matrix.points[0][0]).toBe(-3);
    expect(matrix.points[0][1]).toBe(5);
    expect(matrix.points[1][0]).toBe(1);
    expect(matrix.points[1][1]).toBe(-2);
  });

  describe('equality', () => {
    it('returns true with the same matrices', () => {
      const points = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16]
      ];
      const matrix1 = new Matrix(points);
      const matrix2 = new Matrix(points);

      expect(matrix1.equals(matrix2)).toBe(true);
    });

    it('returns false with different matrices', () => {
      const points = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
      ];
      const points2 = [
        [2, 3, 4, 5],
        [6, 7, 8, 9],
        [8, 7, 6, 5],
        [4, 3, 2, 1]
      ];
      const matrix1 = new Matrix(points);
      const matrix2 = new Matrix(points2);

      expect(matrix1.equals(matrix2)).toBe(false);
    });
  });

  describe('multiplication', () => {
    it('multiplies two matrices', () => {
      const points1 = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 8, 7, 6],
        [5, 4, 3, 2]
      ];
      const points2 = [
        [-2, 1, 2, 3],
        [3, 2, 1, -1],
        [4, 3, 6, 5],
        [1, 2, 7, 8]
      ]

      const expectedMatrix = new Matrix([
        [20, 22, 50, 48],
        [44, 54, 114, 108],
        [40, 58, 110, 102],
        [16, 26, 46, 42]
      ]);
      const matrix1 = new Matrix(points1);
      const matrix2 = new Matrix(points2);

      expect(matrix1.multiply(matrix2)).toEqual(expectedMatrix);
    });

    it('multiplies by a tuple', () => {
      const points = [
        [1, 2, 3, 4],
        [2, 4, 4, 2],
        [8, 6, 4, 1],
        [0, 0, 0, 1]
      ];
      const matrix = new Matrix(points);
      const tuple = new Tuple(1, 2, 3, 1);
      const expectedTuple = new Tuple(18, 24, 33, 1);

      const result = matrix.multiplyByTuple(tuple);
      expect(result).toEqual(expectedTuple)
    });

    it('multiplies by the identity matrix', () => {
      const matrix = new Matrix([
        [0, 1, 2, 4],
        [1, 2, 4, 8],
        [2, 4, 8, 16],
        [4, 8, 16, 32]
      ]);

      const result = matrix.multiply(new IdentityMatrix());

      expect(result).toEqual(matrix);
    });
  });

  describe('transpose', () => {
    it('transposes matrix', () => {
      const matrix = new Matrix([
        [0, 9, 3, 0],
        [9, 8, 0, 8],
        [1, 8, 5, 3],
        [0, 0, 5, 8]
      ]);

      const expected = new Matrix([
        [0, 9, 1, 0],
        [9, 8, 8, 0],
        [3, 0, 5, 5],
        [0, 8, 3, 8]
      ]);

      expect(matrix.transpose()).toEqual(expected);
    });

    it('transposes identity matrix', () => {
      expect(new IdentityMatrix().transpose()).toEqual(new IdentityMatrix());
    });
  });

  describe('inversion', () => {
    it('calculates the determinant of a 2x2 matrix', () => {
      const matrix = new Matrix([
        [1, 5],
        [-3, 2]
      ]);

      expect(matrix.determinant()).toEqual(17);
    });

    it('gets the submatrix of a 3x3 matrix', () => {
      const matrix = new Matrix([
        [1, 5, 0],
        [-3, 2, 7],
        [0, 6, -3]
      ]);

      const expectedMatrix = new Matrix([
        [-3, 2],
        [0, 6]
      ]);

      expect(matrix.subMatrix(0, 2)).toEqual(expectedMatrix);
    });

    it('gets the submatrix of a 4x4 matrix', () => {
      const matrix = new Matrix([
        [-6, 1, 1, 6],
        [-8, 5, 8, 6],
        [-1, 0, 8, 2],
        [-7, 1, -1, 1]
      ]);

      const expectedMatrix = new Matrix([
        [-6, 1, 6],
        [-8, 8, 6],
        [-7, -1, 1]
      ]);

      expect(matrix.subMatrix(2, 1)).toEqual(expectedMatrix);
    });

    it('gets the minor of a 3x3 matrix', () => {
      const matrix = new Matrix([
        [3, 5, 0],
        [2, -1, -7],
        [6, -1, 5]
      ]);

      expect(matrix.minor(1, 0)).toEqual(25);
    });

    it('gets the cofactor of a 3x3 matrix when minor is even', () => {
      const matrix = new Matrix([
        [3, 5, 0],
        [2, -1, -7],
        [6, -1, 5]
      ]);

      expect(matrix.minor(0, 0)).toEqual(-12);
      expect(matrix.cofactor(0, 0)).toEqual(-12);
    });

    it('gets the cofactor of a 3x3 matrix when minor is odd', () => {
      const matrix = new Matrix([
        [3, 5, 0],
        [2, -1, -7],
        [6, -1, 5]
      ]);

      expect(matrix.minor(1, 0)).toEqual(25);
      expect(matrix.cofactor(1, 0)).toEqual(-25);
    });

    it('calculates the cofactors of a 3x3 matrix', () => {
      const matrix = new Matrix([
        [1, 2, 6],
        [-5, 8, -4],
        [2, 6, 4]
      ]);

      expect(matrix.cofactor(0, 0)).toEqual(56);
      expect(matrix.cofactor(0, 1)).toEqual(12);
      expect(matrix.cofactor(0, 2)).toEqual(-46);
      expect(matrix.determinant()).toEqual(-196);
    });

    it('tests an invertible matrix', () => {
      const matrix = new Matrix([
        [6, 4, 4, 4],
        [5, 5, 7, 6],
        [4, -9, 3, -7],
        [9, 1, 7, -6]
      ]);

      expect(matrix.determinant()).toEqual(-2120)
    });

    it('tests a non-invertible matrix', () => {
      const matrix = new Matrix([
        [-4, 2, -2, -3],
        [9, 6, 2, 6],
        [0, -5, 1, -5],
        [0, 0, 0, 0]
      ]);

      expect(matrix.determinant()).toEqual(0)
    });

    it('calculates the inverse of a matrix', () => {
      const matrix = new Matrix([
        [-5, 2, 6, -8],
        [1, -5, 1, 8],
        [7, 7, -6, -7],
        [1, -3, 7, 4]
      ]);

      expect(matrix.determinant()).toEqual(532);
      expect(matrix.cofactor(2, 3)).toEqual(-160);
      expect(matrix.cofactor(3, 2)).toEqual(105);

      const invertedMatrix = matrix.inverse();
      expect(invertedMatrix.points[3][2]).toEqual(parseFloat((-160/532).toFixed(5)));
      expect(invertedMatrix.points[2][3]).toEqual(parseFloat((105/532).toFixed(5)));
    });

    it('calculates the inverse of another matrix', () => {
      const matrix = new Matrix([
        [8, -5, 9, 2],
        [7, 5, 6, 1],
        [-6, 0, 9, 6],
        [-3, 0, -9, -4]
      ]);

      const invertedMatrix = new Matrix([
        [-0.15385, -0.15385, -0.28205, -0.53846],
        [-0.07692, 0.12308, 0.02564, 0.03077],
        [0.35897, 0.35897, 0.43590, 0.92308],
        [-0.69231, -0.69231, -0.76923, -1.92308]
      ]);

      expect(matrix.inverse()).toEqual(invertedMatrix);
    });

    it('calculates the inverse of a third matrix', () => {
      const matrix = new Matrix([
        [9, 3, 0, 9],
        [-5, -2, -6, -3],
        [-4, 9, 6, 4],
        [-7, 6, 6, 2]
      ]);

      const invertedMatrix = new Matrix([
        [-0.04074, -0.07778, 0.14444, -0.22222],
        [-0.07778, 0.03333, 0.36667, -0.33333],
        [-0.02901, -0.14630, -0.10926, 0.12963],
        [0.17778, 0.06667, -0.26667, 0.33333]
      ]);

      expect(matrix.inverse()).toEqual(invertedMatrix);
    });

    it('multiplies a product by its inverse', () => {
      const matrix = new Matrix([
        [3, -9, 7, 3],
        [3, -8, 2, -9],
        [-4, 4, 4, 1],
        [-6, 5, -1, 1]
      ]);
      const matrix2 = new Matrix([
        [8, 2, 2, 2],
        [3, -1, 7, 0],
        [7, 0, 5, 4],
        [6, -2, 0, 5]
      ]);
      const matrix3 = matrix.multiply(matrix2);

      const inverseMultiply = matrix3.multiply(matrix2.inverse());
      inverseMultiply.points.forEach((row, rowIndex) => {
        row.forEach((value, columnIndex) => {
          // TODO: Might need to solve rounding problems?
          expect(value).toBeCloseTo(matrix.points[rowIndex][columnIndex]);
        });
      })
    });
  });

  describe('translation moves a point', () => {
    it('multiplies by a translation matrix', () => {
      const transform = new Translation(5, -3, 2);

      const point = new Point(-3, 4, 5);

      expect(transform.multiplyByTuple(point)).toEqual(new Point(2, 1, 7));
    });

    it('multiplies by the inverse of a translation matrix', () => {
      const inverseTransform = new Translation(5, -3, 2).inverse();

      const point = new Point(-3, 4, 5);

      expect(inverseTransform.multiplyByTuple(point)).toEqual(new Point(-8, 7, 3));
    });

    it('translation does not affect vectors', () => {
      const transform = new Translation(5, -3, 2);

      const vector = new Vector(-3, 4, 5);

      expect(transform.multiplyByTuple(vector)).toEqual(vector);
    });
  });

  describe('scaling moves a point by adding to it', () => {
    it('applies to a point', () => {
      const transform = new Scaling(2, 3, 4);

      const point = new Point(-4, 6, 8);

      expect(transform.multiplyByTuple(point)).toEqual(new Point(-8, 18, 32));
    });

    it('applies to a vector', () => {
      const transform = new Scaling(2, 3, 4);

      const point = new Vector(-4, 6, 8);

      expect(transform.multiplyByTuple(point)).toEqual(new Vector(-8, 18, 32));
    });

    it('applies inverse of transform to a vector', () => {
      const inverseTransform = new Scaling(2, 3, 4).inverse();

      const result = inverseTransform.multiplyByTuple(new Vector(-4, 6, 8));

      const expected = new Vector(-2, 2, 2);
      expect(result.x).toBeCloseTo(expected.x);
      expect(result.y).toBeCloseTo(expected.y);
      expect(result.z).toBeCloseTo(expected.z);
      expect(result.w).toBeCloseTo(expected.w);
    });

    it('reflection is scaling by a negative attitude', () => {
      const transform = new Scaling(-1, 1, 1);

      const point = new Point(2, 3, 4);

      expect(transform.multiplyByTuple(point)).toEqual(new Point(-2, 3, 4));
    });
  });

  describe('rotation around the x axis', () => {
    it('rotates a point around the x axis', () => {
      const point = new Point(0, 1, 0);
      const halfQuarter = new RotationX(Math.PI / 4).multiplyByTuple(point);
      const fullQuarter = new RotationX(Math.PI / 2).multiplyByTuple(point);

      const expectedHalfQuarterPoint = new Point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2)
      const expectedFullQuarterPoint = new Point(0, 0, 1);

      expect(halfQuarter.x).toBeCloseTo(expectedHalfQuarterPoint.x)
      expect(halfQuarter.y).toBeCloseTo(expectedHalfQuarterPoint.y)
      expect(halfQuarter.z).toBeCloseTo(expectedHalfQuarterPoint.z)
      expect(halfQuarter.w).toBeCloseTo(expectedHalfQuarterPoint.w)
      expect(fullQuarter.x).toBeCloseTo(expectedFullQuarterPoint.x)
      expect(fullQuarter.y).toBeCloseTo(expectedFullQuarterPoint.y)
      expect(fullQuarter.z).toBeCloseTo(expectedFullQuarterPoint.z)
      expect(fullQuarter.w).toBeCloseTo(expectedFullQuarterPoint.w)
    });

    it('the inverse of an x-rotation rotates in the opposite direction', () => {
      const point = new Point(0, 1, 0);
      const halfQuarter = new RotationX(Math.PI / 4)
        .inverse()
        .multiplyByTuple(point);

      const expectedHalfQuarterPoint = new Point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2)

      expect(halfQuarter.x).toBeCloseTo(expectedHalfQuarterPoint.x)
      expect(halfQuarter.y).toBeCloseTo(expectedHalfQuarterPoint.y)
      expect(halfQuarter.z).toBeCloseTo(expectedHalfQuarterPoint.z)
      expect(halfQuarter.w).toBeCloseTo(expectedHalfQuarterPoint.w)
    });
  });

  describe('rotation around the y axis', () => {
    it('rotates a point around the y axis', () => {
      const point = new Point(0, 0, 1);
      const halfQuarter = new RotationY(Math.PI / 4).multiplyByTuple(point);
      const fullQuarter = new RotationY(Math.PI / 2).multiplyByTuple(point);

      const expectedHalfQuarterPoint = new Point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2)
      const expectedFullQuarterPoint = new Point(1, 0, 0);

      expect(halfQuarter.x).toBeCloseTo(expectedHalfQuarterPoint.x)
      expect(halfQuarter.y).toBeCloseTo(expectedHalfQuarterPoint.y)
      expect(halfQuarter.z).toBeCloseTo(expectedHalfQuarterPoint.z)
      expect(halfQuarter.w).toBeCloseTo(expectedHalfQuarterPoint.w)
      expect(fullQuarter.x).toBeCloseTo(expectedFullQuarterPoint.x)
      expect(fullQuarter.y).toBeCloseTo(expectedFullQuarterPoint.y)
      expect(fullQuarter.z).toBeCloseTo(expectedFullQuarterPoint.z)
      expect(fullQuarter.w).toBeCloseTo(expectedFullQuarterPoint.w)
    });
  });

  describe('rotation around the z axis', () => {
    it('rotates a point around the z axis', () => {
      const point = new Point(0, 1, 0);
      const halfQuarter = new RotationZ(Math.PI / 4).multiplyByTuple(point);
      const fullQuarter = new RotationZ(Math.PI / 2).multiplyByTuple(point);

      const expectedHalfQuarterPoint = new Point(-(Math.sqrt(2) / 2), (Math.sqrt(2) / 2), 0)
      const expectedFullQuarterPoint = new Point(-1, 0, 0);

      expect(halfQuarter.x).toBeCloseTo(expectedHalfQuarterPoint.x)
      expect(halfQuarter.y).toBeCloseTo(expectedHalfQuarterPoint.y)
      expect(halfQuarter.z).toBeCloseTo(expectedHalfQuarterPoint.z)
      expect(halfQuarter.w).toBeCloseTo(expectedHalfQuarterPoint.w)
      expect(fullQuarter.x).toBeCloseTo(expectedFullQuarterPoint.x)
      expect(fullQuarter.y).toBeCloseTo(expectedFullQuarterPoint.y)
      expect(fullQuarter.z).toBeCloseTo(expectedFullQuarterPoint.z)
      expect(fullQuarter.w).toBeCloseTo(expectedFullQuarterPoint.w)
    });
  });

  describe('shearing changes each coordinate in proportion to the other two', () => {
    it('moves x in proportion to y', () => {
      const shearing = new Shearing(1, 0, 0, 0, 0, 0);

      const point = new Point(2, 3, 4);

      expect(shearing.multiplyByTuple(point)).toEqual(new Point(5, 3, 4));
    });

    it('moves x in proportion to z', () => {
      const shearing = new Shearing(0, 1, 0, 0, 0, 0);

      const point = new Point(2, 3, 4);

      expect(shearing.multiplyByTuple(point)).toEqual(new Point(6, 3, 4));
    });

    it('moves y in proportion to x', () => {
      const shearing = new Shearing(0, 0, 1, 0, 0, 0);

      const point = new Point(2, 3, 4);

      expect(shearing.multiplyByTuple(point)).toEqual(new Point(2, 5, 4));
    });

    it('moves y in proportion to z', () => {
      const shearing = new Shearing(0, 0, 0, 1, 0, 0);

      const point = new Point(2, 3, 4);

      expect(shearing.multiplyByTuple(point)).toEqual(new Point(2, 7, 4));
    });

    it('moves z in proportion to x', () => {
      const shearing = new Shearing(0, 0, 0, 0, 1, 0);

      const point = new Point(2, 3, 4);

      expect(shearing.multiplyByTuple(point)).toEqual(new Point(2, 3, 6));
    });

    it('moves z in proportion to y', () => {
      const shearing = new Shearing(0, 0, 0, 0, 0, 1);

      const point = new Point(2, 3, 4);

      expect(shearing.multiplyByTuple(point)).toEqual(new Point(2, 3, 7));
    });
  });

  describe('chaining transformations', () => {
    it('applies transformations in sequence', () => {
      const p1 = new Point(1, 0, 1);
      const A = new RotationX(Math.PI / 2);
      const B = new Scaling(5, 5, 5);
      const C = new Translation(10, 5, 7);

      const p2 = A.multiplyByTuple(p1);
      const expectedP2 = new Point(1, -1, 0);
      expect(p2.x).toBeCloseTo(expectedP2.x);
      expect(p2.y).toBeCloseTo(expectedP2.y);
      expect(p2.z).toBeCloseTo(expectedP2.z);
      expect(p2.w).toBeCloseTo(expectedP2.w);
      const p3 = B.multiplyByTuple(p2);
      const expectedP3 = new Point(5, -5, 0);
      expect(p3.x).toBeCloseTo(expectedP3.x);
      expect(p3.y).toBeCloseTo(expectedP3.y);
      expect(p3.z).toBeCloseTo(expectedP3.z);
      expect(p3.w).toBeCloseTo(expectedP3.w);
      const p4 = C.multiplyByTuple(p3);
      expect(p4).toEqual(new Point(15, 0, 7));
    });

    it('chained transformations must be applied in reverse order', () => {
      const p = new Point(1, 0, 1);
      const A = new RotationX(Math.PI / 2);
      const B = new Scaling(5, 5, 5);
      const C = new Translation(10, 5, 7);

      // TODO: Try to implement fluent api, something like this: https://github.com/basarat/demo-fluent/blob/master/src/index.ts
      const T = C.multiply(B).multiply(A)
      expect(T.multiplyByTuple(p)).toEqual(new Point(15, 0, 7));
    });
  });
});