import {Color, Point} from "./tuples";

export class Canvas {
  width: number;
  height: number;
  pixels: Color[];

  constructor(width: number, height: number, color: Color = new Color(0, 0, 0)) {
    this.width = width;
    this.height = height;
    this.pixels = [];
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const newColor = new Color(color.red, color.green, color.blue)
        newColor.x = i;
        newColor.y = j;
        this.pixels.push(newColor);
      }
    }
  }

  writePixel(x: number, y: number, color: Color) {
    try {
      const pixel = this.pixelAt(Math.round(x), Math.round(y));
      pixel!.red = color.red;
      pixel!.green = color.green;
      pixel!.blue = color.blue;
    } catch {
      console.log('no pixel there')
    }
  }

  pixelAt(x: number, y: number): Color {
    return this.pixels.find(pixel => pixel.x === x && pixel.y === y)!;
  }

  toPPM(): string {
    const header = `P3\n${this.width} ${this.height}\n255`;
    const colorValues = this.pixels.map(x => this.colorToPPM(x));
    const colorValuesString = this.colorPPMArrayToString(colorValues);

    const ppmString = `${header}\n${colorValuesString}\n`;
    return ppmString;
  }

  pointInBounds(point: Point) {
    return Math.round(point.x) <= this.width && Math.round(point.y) <= this.height;
  }

  private colorPPMArrayToString(colorValues: string[]): string {
    let result = '';
    let currentLineLength = 0;

    colorValues.forEach((x, index) => {
      if (x.length + currentLineLength > 70 || index > 0 && (index % (this.width) === 0)) {
        result = result.slice(0, -1);
        result += `\n${x} `;
        currentLineLength = 0;
      } else {
        result += `${x} `;
        currentLineLength += (x.length + 1);
      }
    });

    return result.slice(0, -1);
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