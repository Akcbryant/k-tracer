import {Color, Point, Vector} from "./tuples";
import {Canvas} from "./canvas";
import {RotationX, RotationY, RotationZ, Scaling, Shearing, Translation, ViewTransform} from "./matrix";
import {Ray} from "./ray";
import {Sphere} from "./sphere";
import {Material} from "./material";
import {Light} from "./light";
import {World} from "./world";
import {Camera} from "./camera";

// entry point for npm run start:dev
const fs = require('fs');

const floor = new Sphere();
floor.transform = new Scaling(10, 0.01, 10);
floor.material = new Material();
floor.material.color = new Color(1, 0.9, 0.9);
floor.material.specular = 0;

const leftWall = new Sphere();
leftWall.transform = new Translation(0, 0, 5)
  .multiply(new RotationY(-Math.PI/4))
  .multiply(new RotationX(Math.PI/2))
  .multiply(new Scaling(10, 0.01, 10));
leftWall.material = floor.material;

const rightWall = new Sphere();
rightWall.transform = new Translation(0, 0, 5)
  .multiply(new RotationY(Math.PI/4))
  .multiply(new RotationX(Math.PI/2))
  .multiply(new Scaling(10, 0.01, 10));
rightWall.material = floor.material;

const middle = new Sphere();
middle.transform = new Translation(-0.5, 1, 0.5);
middle.material = new Material();
middle.material.color = new Color(0.1, 1, 0.5);
middle.material.diffuse = 0.7;
middle.material.specular = 0.3;

const right = new Sphere();
right.transform = new Translation(1.5, 0.5, -0.5).multiply(new Scaling(0.5, 0.5, 0.5));
right.material = new Material();
right.material.color = new Color(0.5, 1, 0.1);
right.material.diffuse = 0.7;
right.material.specular = 0.3;

const left = new Sphere();
left.transform = new Translation(-1.5, 0.33, -0.75).multiply(new Scaling(0.33, 0.33, 0.33));
left.material = new Material();
left.material.color = new Color(1, 0.8, 0.1);
left.material.diffuse = 0.7;
left.material.specular = 0.3;

const world = new World();
world.light = new Light(new Point(-10, 10, -10), new Color(1, 1, 1));
world.objects = [floor, leftWall, rightWall, middle, right, left];

const camera = new Camera(50, 50, Math.PI/3);
camera.transform = new ViewTransform(new Point(0, 1.5, -5),
  new Point(0, 1, 0),
  new Vector(0, 1, 0));


console.log('starting')
console.log('starting writing')
const canvas = camera.render(world);
console.log('saving to file')
saveToFile();
console.log('done')

function saveToFile(): void {
  fs.writeFileSync('k-tracer.ppm', canvas.toPPM());
}


