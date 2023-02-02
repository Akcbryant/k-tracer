import {IdentityMatrix, RotationY, Translation, ViewTransform} from "../src/matrix";
import {Camera} from "../src/camera";
import {Point, Vector} from "../src/tuples";
import {World} from "../src/world";

describe('Camera', () => {
  it('creates a camera with height width and field of view', () => {
    const hSize = 160;
    const vSize = 120;
    const fieldOfView = Math.PI / 2;

    const camera = new Camera(hSize, vSize, fieldOfView);

    expect(camera.hSize).toEqual(hSize);
    expect(camera.vSize).toEqual(vSize);
    expect(camera.fieldOfView).toEqual(fieldOfView);
    expect(camera.transform).toEqual(new IdentityMatrix());
  });

  describe('pixelSize', () => {
    it('sets pixel size for a horizontal canvas', () => {
      const camera = new Camera(200, 125, Math.PI / 2);

      expect(camera.pixelSize).toBeCloseTo(0.01);
    });

    it('sets pixel size for a vertical canvas', () => {
      const camera = new Camera(125, 200, Math.PI / 2);

      expect(camera.pixelSize).toBeCloseTo(0.01);
    });
  });

  describe('rayForPixel', () => {
    it('constructs a ray through the center of the canvas', () => {
      const camera = new Camera(201, 101, Math.PI / 2);

      const ray = camera.rayForPixel(100, 50);

      expect(ray.origin).toEqual(new Point(0, 0, 0));
      expect(ray.direction.x).toBeCloseTo(0);
      expect(ray.direction.y).toBeCloseTo(0);
      expect(ray.direction.z).toBeCloseTo(-1);
    });

    it('constructs a ray through a corner of the canvas', () => {
      const camera = new Camera(201, 101, Math.PI / 2);

      const ray = camera.rayForPixel(0, 0);

      expect(ray.origin).toEqual(new Point(0, 0, 0));
      expect(ray.direction.x).toBeCloseTo(0.66519);
      expect(ray.direction.y).toBeCloseTo(0.33259);
      expect(ray.direction.z).toBeCloseTo(-0.66851);
    });

    it('constructs a ray when the camera is transformed', () => {
      const camera = new Camera(201, 101, Math.PI / 2);
      camera.transform = new RotationY(Math.PI / 4).multiply(new Translation(0, -2, 5));

      const ray = camera.rayForPixel(100, 50);

      expect(ray.origin.x).toEqual(0);
      expect(ray.origin.y).toEqual(2);
      expect(ray.origin.z).toEqual(-5);
      expect(ray.direction.x).toBeCloseTo(Math.sqrt(2) / 2);
      expect(ray.direction.y).toBeCloseTo(0);
      expect(ray.direction.z).toBeCloseTo(-Math.sqrt(2) / 2);
    });
  });

  describe('render', () => {
    it('renders a world with a camera', () => {
      const world = new World();
      const camera = new Camera(11, 11, Math.PI / 2);
      const from = new Point(0, 0, -5);
      const to = new Point(0, 0, 0);
      const up = new Vector(0, 1, 0);
      camera.transform = new ViewTransform(from, to, up);

      const image = camera.render(world);
      const pixel = image.pixelAt(5, 5);

      expect(pixel.red).toBeCloseTo(pixel.red);
      expect(pixel.green).toBeCloseTo(pixel.green);
      expect(pixel.blue).toBeCloseTo(pixel.blue);
    });
  });
});