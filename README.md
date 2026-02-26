# galaxyrise

Interactive 3D star map built with React and Three.js, visualizing ~250 real celestial bodies in their galactic positions, and optimized for use as a design tool for an original board game.

## About

<img width="1500" height="842" alt="Lights in the Void: Coronal Loop" src="https://github.com/user-attachments/assets/0a6e5b57-dbd9-4a8e-874d-258f9af045b4" />

My wife and I are designing a physical board game, tentatively titled Lights in the Void: Coronal Loop. Players work together to navigate a ship across the Milky Way, drawing from 200 unique cards representing real-life stars, planets, and other celestial bodies, and mapping them on the board as they go. This tool renders those and other objects in 3D space, which has helped us develop this board game by translating their observed locations to spaces on a 2D hexagonal board.

Stars are plotted using real astronomical data — distance in light-years from Earth, galactic latitude/longitude, and radius — and colored according to Morgan–Keenan spectral classification (O, B, A, F, G, K, M).

## Tech Stack

React, TypeScript, Three.js

## Getting Started

```bash
npm install
npm start
```

## Project Structure

```
src/
├── App.tsx                      # Root component
├── GalaxyMap.tsx                # 3D scene: coordinate conversion, hex grid, star rendering
├── CelestialBody.tsx            # Star component with spectral color mapping and hover interaction
└── celestialBodies.json  # Datafile with ~250 real stars and other celestial bodies
```

## License

AGPL-3.0-or-later
