# k-tracer

Progressing through the Ray Tracer Challenge book using Typescript

http://raytracerchallenge.com/

`npm run start:dev`

Basic summary of how ray tracing works:
* Cast a ray of white light from a pixel
* Find the first object the ray intersects with
* If it is a light source, multiply the ray's color with the light source's colour to get the pixel colour
* Otherwise, reflect, refract or absorb the ray, and go back to step 2 with the resulting ray

## Latest Chapter Completed Render:
### Chapter 9

![Screenshot](renders/k-tracer-chapter-9.png)

### [Link to all completed chapters](renders)