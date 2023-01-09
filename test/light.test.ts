import {Color, Point} from "../src/tuples";
import {Light} from "../src/light";

describe('Light', () => {
  it('as point light has a position and intensity', () => {
    const position = new Point(0, 0, 0);
    const intensity = new Color(1, 1, 1);

    const light = new Light(position, intensity)

    expect(light.position).toEqual(position);
    expect(light.intensity).toEqual(intensity);
  });
});