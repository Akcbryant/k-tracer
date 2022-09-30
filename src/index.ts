import {Projectile} from "./projectile";
import {Environment} from "./environment";
import {Point, Vector} from "./tuples";

// entry point for npm run start:dev
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function tick(environment: Environment, projectile: Projectile): Projectile {
  const position = projectile.position
    .add(projectile.velocity);
  const velocity = projectile.velocity
    .add(environment.gravity)
    .add(environment.wind);

  return new Projectile(position, velocity);
}

let projectile = new Projectile(new Point(0, 1, 0), new Vector(1, 1, 0).normalize());

function promptForTick(): void  {
  const environment = new Environment(new Vector(0, -0.1, 0), new Vector(-0.01, 0, 0));
  rl.question('Please push enter', () => {
    if (projectile.position.y <= 0) {
      console.log('you are done, thanks for playing, final position', projectile.position.y);
      rl.close();
    } else {
      console.log('projectile pre tick', projectile);
      projectile = tick(environment, projectile);
      console.log('projectile after tick', projectile)
      promptForTick();
    }
  });
}

promptForTick();



