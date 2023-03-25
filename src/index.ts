import {Color, Point, Vector} from "./tuples";
import {IdentityMatrix, RotationX, RotationY, RotationZ, Scaling, Translation, ViewTransform} from "./matrix";
import {Sphere} from "./sphere";
import {Material} from "./material";
import {Light} from "./light";
import {World} from "./world";
import {Camera} from "./camera";
import {Plane} from "./plane";
import {CheckerPattern, GradientPattern, RingPattern, StripePattern} from "./pattern";
import {EPSILON} from "./constants";

// entry point for npm run start:dev
const fs = require('fs');

const floor = new Plane();
floor.material = new Material();
floor.material.color = new Color(0.9,1.0,0.9);
floor.material.specular = 0.5;
floor.material.pattern = new GradientPattern(new Color(0.2,0.4,0.5), new Color(0.1,0.9,0.7))
floor.transform = new Translation(0, 0, 15).multiply(new RotationY(1));

const middle = new Sphere();
middle.transform = new Translation(0, 1, 0).multiply(new RotationY(0.1)).multiply(new RotationZ(0.2));
middle.material = new Material();
middle.material.color = new Color(0.1, 1, 0.5);
middle.material.diffuse = 0.7;
middle.material.specular = 0.3;
middle.material.pattern = new StripePattern(new Color(0.1, 0.1, 0.6), new Color(0.1, 0.7, 0.2));
middle.material.pattern.transform = new Translation(1, 0, 0).multiply(new Scaling(0.2, 0.2, 0.2));

const right = new Sphere();
right.transform = new Translation(2, 0.5, -0.5).multiply(new Scaling(0.5, 0.5, 0.5));
right.material = new Material();
right.material.color = new Color(0.1, 0.7, 0.2);
right.material.diffuse = 0.7;
right.material.specular = 0.3;
right.material.pattern = new CheckerPattern(new Color(1, 0.1, 0.6), new Color(0, 0.7, 0.2));

const left = new Sphere();
left.transform = new Translation(-5, 2, 9).multiply(new Scaling(2, 2, 2));
left.material = new Material();
left.material.color = new Color(1, 0.8, 0.1);
left.material.diffuse = 0.7;
left.material.specular = 0.3;
left.material.pattern = new CheckerPattern(new Color(0.9, 0.9, 0.9), new Color(0.1, 0.1, 0.1));

const wall = new Plane();
wall.transform = new Translation(0, 0, 15).multiply(new RotationY(1)).multiply(new RotationX(Math.PI/2));
wall.material = new Material();
wall.material.color= new Color(1,1,1);
wall.material.diffuse = 0.7;
wall.material.specular = 0.3;
wall.material.pattern = new RingPattern(new Color(0,0.1,0.7), new Color(1,1,1), new Scaling(1,1,1));

const wall2 = new Plane();
wall2.transform = new Translation(0, 0, 15).multiply(new RotationY(1 - Math.PI / 2).multiply(new RotationX(Math.PI / 2)));
wall.material = new Material();
wall2.material.color= new Color(0,0,0.8);
wall2.material.diffuse=0.7;
wall2.material.specular=0.3;
wall2.material.pattern= new CheckerPattern(new Color(0,0.1,0.7), new Color(1,1,1), new Translation(0, EPSILON,0));

const world = new World();
world.light = new Light(new Point(-10, 10, -10), new Color(1, 1, 1));
world.objects = [floor, middle, right, left, wall, wall2];

const camera = new Camera(512, 512, Math.PI/3);
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


