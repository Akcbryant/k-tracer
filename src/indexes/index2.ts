import {Color, Point} from "../tuples";
import {Canvas} from "../canvas";
import {RotationY} from "../matrix";

// entry point for npm run start:dev
const fs = require('fs');

const twelve = new Point(0, 0, 1)
const canvas = new Canvas(100, 100);
const radius = canvas.width * (3/8);
const rotation = new RotationY(Math.PI / 6);

const one = writePixelThenTranslate(twelve);
const two = writePixelThenTranslate(one);
const three = writePixelThenTranslate(two);
const four = writePixelThenTranslate(three);
const five = writePixelThenTranslate(four);
const six = writePixelThenTranslate(five);
const seven = writePixelThenTranslate(six);
const eight = writePixelThenTranslate(seven);
const nine = writePixelThenTranslate(eight);
const ten = writePixelThenTranslate(nine);
const eleven = writePixelThenTranslate(ten);
writePixelThenTranslate(eleven);

saveToFile();

function writePixelThenTranslate(point: Point): Point {
  const newPoint = rotation.multiplyByTuple(point);
  console.log(newPoint)
  const pixelX = (newPoint.x * radius) + (canvas.width / 2)
  console.log('pixelX', pixelX)
  const pixelY = (newPoint.z * radius) + (canvas.height / 2)
  console.log('pixelY', pixelY)
  canvas.writePixel(pixelX, pixelY, new Color(1, 0, 0));
  return newPoint;
}

function saveToFile(): void {
  fs.writeFileSync('k-tracer.ppm', canvas.toPPM());
}


