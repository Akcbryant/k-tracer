import {Color, Point} from "./tuples";

export class Canvas {
  width: number;
  height: number;
  pixels: Float64Array;

  constructor(width: number, height: number, color?: Color) {
    this.width = width;
    this.height = height;
    this.pixels = new Float64Array(width * height * 3);
    for (let i = 0; i < this.pixels.length; i++) {
      this.pixels[i] = 0;
    }

    if (color != null) {
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height ; y++) {
          this.writePixel(x, y, color);
        }
      }
    }
  }

  writePixel(x: number, y: number, color: Color) {
      if (x < 0|| x >= this.width || y < 0 || y >= this.height) return;

      const pixelIndex = Math.round(y) * this.width * 3 + Math.round(x) * 3;
      this.pixels[pixelIndex] = color.red;
      this.pixels[pixelIndex + 1] = color.green;
      this.pixels[pixelIndex + 2] = color.blue;
  }

  pixelAt(x: number, y: number): Color {
    const pixelIndex = Math.round(y) * this.width * 3 + Math.round(x) * 3;
    return new Color(this.pixels[pixelIndex], this.pixels[pixelIndex + 1], this.pixels[pixelIndex + 2]);
  }

  toPPM(): string {
    let ppm = "P3\n";
    ppm += this.width + " " + this.height + "\n";
    ppm += "255";
    for (let i = 0; i < this.pixels.length; i += 3)
    {
      ppm += (i % 15 == 0) ? "\n" :" ";
      ppm += this.colorToPPM(new Color(this.pixels[i], this.pixels[i+1], this.pixels[i+2]));
    }
    ppm+="\n";
    return ppm;
  }

  pointInBounds(point: Point) {
    return Math.round(point.x) <= this.width && Math.round(point.y) <= this.height;
  }

  private colorToPPM(color: Color): string {
   return `${this.colorValueToPPM(color.red)} ${this.colorValueToPPM(color.green)} ${this.colorValueToPPM(color.blue)}`;
  }

  private colorValueToPPM(colorValue: number): number {
    if (colorValue >= 1) return 255;
    if (colorValue < 0) return 0;
    return Math.ceil(255 * colorValue);
  }
}