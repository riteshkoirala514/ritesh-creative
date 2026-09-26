# 3D Models for Background

Drop your `.glb` files here. They'll appear as floating 3D objects in the site background.

## Where to get free models

1. **Sketchfab** — https://sketchfab.com (filter: Downloadable → glTF)
   - Search: "lamborghini", "ferrari", "mansion", "horse", "rolls royce"
   - Download the `.glb` format

2. **Poly Pizza** — https://poly.pizza (free low-poly models)

3. **Kenney** — https://kenney.nl (free game assets, some good cars/buildings)

## How to add a model

1. Download a `.glb` file
2. Drop it in this folder (e.g., `lamborghini.glb`)
3. Open `src/components/ui/BackgroundBlobs.tsx`
4. Uncomment and edit the MODELS array:

```ts
const MODELS: ModelConfig[] = [
  {
    path: '/models/lamborghini.glb',
    position: [3, -1.5, -2],    // x, y, z
    scale: 1,                    // bigger = larger
    rotation: [0, -0.5, 0],     // tilt
    autoRotate: true,            // slow turntable spin
    floatSpeed: 0.3,             // gentle hover
  },
];
```

## Tips
- Keep file size under 5MB per model for performance
- Models with PBR materials (metallic, roughness) look best
- The scene uses sunset lighting — metallic cars look amazing
- Multiple models work — just add more entries to the array
