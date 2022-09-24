console.log()
export class Index {
  public main() {
    console.log('main')
  }

  add(x: number, y: number): number {
    return x + y;
  }
}

// entry point for npm run start:dev
const foo = new Index();
foo.main();

