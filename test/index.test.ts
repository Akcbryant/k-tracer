import {Index} from "../src";

describe('it should do something', () => {
  it('should add something', () => {
    const index = new Index();

    expect(index.add(2, 2)).toBe(4);
  });
})