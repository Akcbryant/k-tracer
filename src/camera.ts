import {IdentityMatrix} from "./matrix";
import {Ray} from "./ray";
import {Point} from "./tuples";
import {World} from "./world";
import {Canvas} from "./canvas";

export class Camera {
  hSize: number;
  vSize: number;
  fieldOfView: number;
  transform: IdentityMatrix;

  halfWidth!: number;
  halfHeight!: number;
  pixelSize!: number;

  constructor(hSize: number, vSize: number, fieldOfView: number) {
    this.hSize = hSize;
    this.vSize = vSize;
    this.fieldOfView = fieldOfView;
    this.transform = new IdentityMatrix();
    this.initializeProperties();
  }

  initializeProperties(): void {
    const halfView = Math.tan(this.fieldOfView / 2);
    const aspect = this.hSize / this.vSize;

    if (aspect >=1) {
      this.halfWidth = halfView;
      this.halfHeight = halfView / aspect;
    } else {
      this.halfWidth = halfView * aspect;
      this.halfHeight = halfView;
    }
    this.pixelSize = (this.halfWidth * 2) / this.hSize;
  }

  public rayForPixel(px: number, py: number): Ray {
    const xOffset = (px + 0.5) * this.pixelSize;
    const yOffset = (py + 0.5) * this.pixelSize;
    const worldX = this.halfWidth - xOffset;
    const worldY = this.halfHeight - yOffset;
    const pixel = this.transform.inverse().multiplyByTuple(new Point(worldX, worldY, -1));
    const origin = this.transform.inverse().multiplyByTuple(new Point(0, 0, 0));
    const direction = pixel.subtract(origin).normalize();

    return new Ray(origin, direction);
  }

  render(world: World): Canvas {
    const image = new Canvas(this.hSize, this.vSize);

    for (let y = 0; y < this.vSize; y++) {
      // TODO: Create proper loading percentage logging?
      console.log('current y', y)
      for (let x = 0; x < this.hSize; x++) {
        const ray = this.rayForPixel(x, y);
        const color = world.colorAt(ray);
        image.writePixel(x, y, color);
      }
    }
    return image;
  }
}