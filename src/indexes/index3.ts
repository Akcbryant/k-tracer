import {Color, Point} from "../tuples";
import {Canvas} from "../canvas";
import {Ray} from "../ray";
import {Sphere} from "../sphere";
import {Material} from "../material";
import {Light} from "../light";

// entry point for npm run start:dev
const fs = require('fs');

console.log('starting')
const canvasPixels = 100;
const rayOrigin = new Point(0, 0, -5);
const wallZ = 10;
const wallSize = 7;
const pixelSize = wallSize / canvasPixels;
const half = wallSize / 2;
const canvas = new Canvas(canvasPixels, canvasPixels);
const shape = new Sphere();
shape.material = new Material();
shape.material.color = new Color(1, 0.2, 1);
// shape.material.ambient = 0.7;
// shape.material.diffuse = 0.7;
// shape.material.specular = 0.7;
// shape.material.shininess = 100;

const lightPosition = new Point(-10, 10, -10);
const lightColor = new Color(1, 1, 1);
const light = new Light(lightPosition, lightColor);

// shrink along the y axis
// shape.transform = new Scaling(1, 0.5, 1);

// shrink along the x axis
// shape.transform = new Scaling(0.5, 1, 1);

// shrink it and rotate it
// shape.transform = new RotationZ(Math.PI / 4).multiply(new Scaling(0.5, 1, 1));

// shrink it and skew it
// shape.transform = new Shearing(1, 0, 0, 0, 0, 0).multiply(new Scaling(0.5, 1, 1))

console.log('starting writing')
writeSphereToCanvas();
console.log('saving to file')
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
      const hit = intersections.hit();

      if (hit != null) {
        const point = ray.position(hit.t)
        const normal = shape.normalAt(point);
        const eye = ray.direction.negate();
        const normalizedColor = shape.material.lighting(light, point, eye, normal);
        canvas.writePixel(x, y, normalizedColor);
      }
    }
  }
}

function saveToFile(): void {
  fs.writeFileSync('k-tracer.ppm', canvas.toPPM());
}


