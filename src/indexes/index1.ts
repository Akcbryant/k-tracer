import {Projectile} from "../projectile";
import {Environment} from "../environment";
import {Color, Point, Vector} from "../tuples";
import {Canvas} from "../canvas";

// entry point for npm run start:dev
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const fs = require('fs');

function tick(environment: Environment, projectile: Projectile): Projectile {
  const position = projectile.position
    .add(projectile.velocity);
  const velocity = projectile.velocity
    .add(environment.gravity)
    .add(environment.wind);

  return new Projectile(position, velocity);
}

const start = new Point(0, 1, 0)
const velocity = new Vector(1, 1.8, 0).normalize().multiply(11.25);
let projectile = new Projectile(start, velocity);

const gravity = new Vector(0, -0.1, 0);
const wind =  new Vector(-0.01, 0, 0);
const canvas = new Canvas(900, 550);

function promptForTick(): void  {
  const environment = new Environment(gravity,wind);
  rl.question('Please push enter', () => {
    if (!canvas.pointInBounds(projectile.position) || projectile.position.y <= 0) {
      console.log('you are done, thanks for playing, final position', projectile.position.y);
      rl.close();
      saveToFile();
    } else {
      console.log('projectile pre tick', projectile);
      canvas.writePixel(Math.round(projectile.position.x), canvas.height - Math.round(projectile.position.y), new Color(1, 0, 0));
      projectile = tick(environment, projectile);
      console.log('projectile after tick', projectile)
      promptForTick();
    }
  });
}

function saveToFile(): void {
  console.log(canvas.pixels)
  fs.writeFileSync('k-tracer.ppm', canvas.toPPM());
}

promptForTick();



