import {Color} from "../src/tuples";
import {Canvas} from "../src/canvas";

describe('Canvas', () => {
  it('creates a canvas', () => {
    const canvas = new Canvas(10, 20);

    expect(canvas.width).toBe(10);
    expect(canvas.height).toBe(20);
  });

  it('writes pixels to a canvas', () => {
    const canvas = new Canvas(10, 20);
    const red = new Color(1, 0, 0);

    canvas.writePixel(2, 3, red);

    const expectedPixel = canvas.pixelAt(2, 3);
    expect(expectedPixel.x).toBe(2);
    expect(expectedPixel.y).toBe(3);
    expect(expectedPixel.red).toBe(1);
    expect(expectedPixel.green).toBe(0);
    expect(expectedPixel.blue).toBe(0);
  });

  describe('PPM - Portable Pixmap', () => {
    it('constructs the PPM pixel data', () => {
      const canvas = new Canvas(5, 3);
      canvas.writePixel(0, 0, new Color(1.5, 0, 0));
      canvas.writePixel(2, 1, new Color(0, 0.5, 0));
      canvas.writePixel(4, 2, new Color(-0.5, 0, 1));

      const expectedPPM =  'P3\n5 3\n255\n'
      + '255 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n'
      + '0 0 0 0 0 0 0 128 0 0 0 0 0 0 0\n'
      + '0 0 0 0 0 0 0 0 0 0 0 0 0 0 255\n';

      expect(canvas.toPPM()).toEqual(expectedPPM);
    });

    it('constructs the PPM pixel data', () => {
      const canvas = new Canvas(10, 2, new Color(1, 0.8, 0.6));

      const expectedPPM =  'P3\n10 2\n255\n'
        + '255 204 153 255 204 153 255 204 153 255 204 153 255 204 153\n'
        + '255 204 153 255 204 153 255 204 153 255 204 153 255 204 153\n'
        + '255 204 153 255 204 153 255 204 153 255 204 153 255 204 153 255 204 153\n'
        + '255 204 153 255 204 153 255 204 153 255 204 153\n';

      expect(canvas.toPPM()).toEqual(expectedPPM);
    });
  });
});
