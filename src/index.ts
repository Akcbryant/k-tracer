import {Color, Point} from "./tuples";
import {Canvas} from "./canvas";
import {RotationY, RotationZ, Scaling, Shearing} from "./matrix";
import {Ray, Sphere} from "./ray";

// entry point for npm run start:dev
const fs = require('fs');

console.log('starting')
const canvasPixels = 1000;
const rayOrigin = new Point(0, 0, -50);
const wallZ = 100;
const wallSize = 70;
const pixelSize = wallSize / canvasPixels;
const half = wallSize / 2;
const canvas = new Canvas(canvasPixels, canvasPixels);
const color = new Color(1, 0, 0);
const shape = new Sphere();

// shrink along the y axis
// shape.transform = new Scaling(1, 0.5, 1);

// shrink along the x axis
// shape.transform = new Scaling(0.5, 1, 1);

// shrink it and rotate it
// shape.transform = new RotationZ(Math.PI / 4).multiply(new Scaling(0.5, 1, 1));

// shrink it and skew it
// shape.transform = new Shearing(1, 0, 0, 0, 0, 0).multiply(new Scaling(0.5, 1, 1))

writeSphereToCanvas();
saveToFile();
console.log('done')

// Move ray of light to each pixel x and y, with wall z position, origin
// If ray of light goes through sphere, color that pixel red
function writeSphereToCanvas(): void {
  for (let y = 0; y < canvasPixels; y++) {
    const worldY = half - (pixelSize * y);
    for (let x = 0; x < canvasPixels; x++) {
      const worldX = -half + (pixelSize * x);
      const position = new Point(worldX, worldY, wallZ);
      const ray = new Ray(rayOrigin, position.subtract(rayOrigin).normalize());
      const intersections = shape.intersect(ray);
      if (Boolean(intersections.hit())) {
        canvas.writePixel(x, y, color);
      }
    }
  }
}

function saveToFile(): void {
  fs.writeFileSync('k-tracer.ppm', canvas.toPPM());
}


