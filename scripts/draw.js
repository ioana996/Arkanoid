import { BRICK_WIDTH } from "./constants.js";

export const drawBricks = (bricks) => {
  let numOfBricksPerRow = 0;
  let initialCoordinate = 2 * BRICK_WIDTH;
  bricks.forEach((brick) => {
    if (numOfBricksPerRow % 12 === 0) {
      initialCoordinate = 2 * BRICK_WIDTH;
    }
    brick.style.left = initialCoordinate + "px";
    initialCoordinate += BRICK_WIDTH;
    numOfBricksPerRow++;
  });
};

export const drawBall = (ball, x, y) => {
  ball.style.left = x + "px";
  ball.style.top = y + "px";
};

export const drawPlatform = (platform, x) => {
  platform.style.left = x + "px";
};
