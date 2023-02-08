import {Color, Point, Vector} from "./tuples";
import {Light} from "./light";

export class Material {
  public color = new Color(1, 1, 1);
  public ambient = 0.1;
  public diffuse = 0.9;
  public specular = 0.9;
  public shininess = 200.0;

  lighting(light: Light, position: Point, eyeVector: Vector, normalVector: Vector, inShadow: boolean) {
    // combine the surface color with the light's color/intensity
    const effectiveColor = Color.hadamardProduct(this.color, light.intensity);

    // compute the ambient contribution
    const ambient = effectiveColor.multiply(this.ambient);
    if (inShadow) return ambient;

    // find the direction to the light source
    const lightVector = light.position.subtract(position).normalize();

    // light_dot_normal represents the cosine of the angle between the
    // light vector and the normal vector. A negative number means the
    // light is on the other side of the surface.
    const lightDotNormal = Vector.dot(lightVector, normalVector);

    let diffuse = new Color(0, 0, 0);
    let specular = new Color(0, 0, 0);
    if (lightDotNormal >= 0) {
      // compute the diffuse contribution
      diffuse = effectiveColor.multiply(this.diffuse).multiply(lightDotNormal);

      // reflect_dot_eye represents the cosine of the angle between the
      // reflection vector and the eye vector. A negative number means the
      // light reflects away from the eye.
      const reflectVector = Vector.reflect(lightVector.negate(), normalVector)
      const reflectDotEye = Vector.dot(reflectVector, eyeVector);

      if (reflectDotEye > 0) {
        // compute the specular contribution
        const factor = Math.pow(reflectDotEye, this.shininess);
        specular = light.intensity.multiply(this.specular).multiply(factor);
      }
    }
    return ambient.add(diffuse).add(specular);
  }
}