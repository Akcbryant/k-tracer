import {Tuple} from "./tuples";

export class Matrix {
  public points: number[][];

  constructor(points: number[][]) {
    this.points = points;
  }

  equals(matrix: Matrix): boolean {
    return JSON.stringify(this.points) === JSON.stringify(matrix.points);
  }

  multiply(matrix: Matrix): Matrix {
    let multipliedPoints: number[][] = [];
    for (let row = 0; row < this.points.length; row++) {
      // initialize row array
      multipliedPoints[row] = [];
      for (let col = 0; col < this.points.length; col++) {
        multipliedPoints[row][col] = this.points[row][0] * matrix.points[0][col] +
          this.points[row][1] * matrix.points[1][col] +
          this.points[row][2] * matrix.points[2][col] +
          this.points[row][3] * matrix.points[3][col];
      }
    }
    return new Matrix(multipliedPoints);
  }

  multiplyByTuple(tuple: Tuple): Tuple {
    return new Tuple(this.rowMultiplyTotal(this.points[0], tuple),
      this.rowMultiplyTotal(this.points[1], tuple),
      this.rowMultiplyTotal(this.points[2], tuple),
      this.rowMultiplyTotal(this.points[3], tuple));
  }

  transpose(): Matrix {
    return new Matrix([
      [ this.points[0][0], this.points[1][0], this.points[2][0], this.points[3][0]],
      [ this.points[0][1], this.points[1][1], this.points[2][1], this.points[3][1]],
      [ this.points[0][2], this.points[1][2], this.points[2][2], this.points[3][2]],
      [ this.points[0][3], this.points[1][3], this.points[2][3], this.points[3][3]],
    ]);
  }

  determinant(): number {
    return this.points.length === 2
      ? (this.points[0][0] * this.points[1][1]) - (this.points[0][1] * this.points[1][0])
      : this.points[0].reduce((previousValue, currentValue, currentIndex) => {
        return previousValue + (currentValue * this.cofactor(0, currentIndex));
      }, 0)
  }

  subMatrix(row: number, column: number): Matrix {
    const subMatrixPoints = this.points
      .filter((_, index) => index != row)
      .map(x => x.filter((_, index) => index != column));

    return new Matrix(subMatrixPoints);
  }

  minor(row: number, column: number): number {
    return this.subMatrix(row, column).determinant();
  }

  cofactor(row: number, column: number): number {
    const minor = this.minor(row, column);
    return ((row + column) % 2 == 0) ? minor : -minor;
  }

  inverse(): Matrix {
    if (this.determinant() === 0) {
      throw new Error('non-invertible')
    }

    let invertedPoints: number[][] = [[], [], [], []];

    this.points.map((value: number[], columnIndex: number) => {
      value.map((value: number, rowIndex: number) => {
        const cofactor = this.cofactor(rowIndex, columnIndex)
        invertedPoints[columnIndex][rowIndex] = parseFloat((cofactor / this.determinant()).toFixed(5));
      })
    });
    return new Matrix(invertedPoints);
  }

  private rowMultiplyTotal(row: number[], tuple: Tuple): number {
    const total = row.reduce((previousValue, currentValue, currentIndex) => {
      return previousValue + (currentValue * tuple.points[currentIndex])
    }, 0);
    return total;
  }
}

export class IdentityMatrix extends Matrix {
  constructor() {
    const identityPoints = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];

    super(identityPoints);
  }
}
