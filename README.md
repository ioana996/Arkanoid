# Arkanoid
Arkanoid game in Javascript

## 🎯 Project Motivation & Description

This Arkanoid game was created as a personal project to practice **vanilla JavaScript**, outside the frameworks I use in my daily work such as **React** and **Next.js**. The main goal was to revisit and strengthen my core JavaScript skills by building an interactive browser game from scratch.

Although there are libraries like [Phaser.js](https://phaser.io/) that are popular for browser-based game development, I deliberately chose not to use them. Instead, I focused on **pure JavaScript and CSS**, which are more directly relevant to my day-to-day frontend development work.

For the same reason, all visual styling and layout are handled using **plain CSS**, without the use of canvas or WebGL. This allowed me to refine layout techniques and practice styling elements through dynamic DOM manipulation.

### 🧪 Gameplay Features

- Ball movement at fixed 45° angles
- Paddle controlled with keyboard input
- Collision detection for bricks, walls, and paddle
- Game restart functionality
- Life tracking system (with game over)
- Single static brick layout (no level progression)

The project uses a modular JavaScript structure via ES6 modules (`<script type="module">`), with each game component split into its own file for maintainability.

Technologies used:

- **JavaScript (ES6+)**
- **CSS3**
- **HTML5**

## 🧱 Brick Collision Logic

The collision system in this game is based on **bounding box detection** with directional response logic. Each brick has an invisible **collision zone** that extends outward in all directions by the diameter of the ball. This ensures that a collision is detected as soon as the ball visually overlaps the brick's space.

### 🧮 Collision Detection Steps

1. **Collision Zone Creation**  
   For each brick, a collision area is calculated by expanding the brick's bounding box in all directions by the ball's diameter. This effectively creates a padded hitbox.

2. **Collision Check**  
   During each frame, the ball's current position is checked against all brick collision zones. If the ball's center is inside this area, a collision is confirmed.

3. **Collision Resolution**  
   Once a collision is detected, the type of collision is determined by evaluating the ball’s position relative to the brick:
   
   - **Top or Bottom** collision → Invert Y-direction (`dy = -dy`)
   - **Left or Right** collision → Invert X-direction (`dx = -dx`)
   - **Corner collision** → Both X and Y directions are inverted, simulating a deflection

This logic mimics a simplified version of **Axis-Aligned Bounding Box (AABB)** collision detection, adapted for circular objects (the ball) interacting with rectangular objects (bricks).

While basic, this method is highly effective for tile-based or grid-aligned games like Arkanoid, and it avoids the need for pixel-perfect or physics-based collision engines.


