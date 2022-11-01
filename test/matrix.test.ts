import {IdentityMatrix, Matrix} from "../src/matrix";
import {Tuple} from "../src/tuples";

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
});