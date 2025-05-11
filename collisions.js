import { BRICK_HEIGHT, BRICK_WIDTH, BALL_WIDTH } from "./constants.js";
import { getBall, getBallXDirection, getBallYDirection } from "./script.js";
import { setBallXDirection, setBallYDirection } from "./script.js";

export const checkBallAndBrickCollisions = (
  bricks,
  ballXDirection,
  ballYDirection
) => {
  for (let i = 0; i < bricks.length; i++) {
    const brick = bricks[i];
    if (isInsideCollisionZone(brick)) {
      if (isTopCollision(brick)) {
        bricks[i].style.display = "none";
        setBallYDirection(-ballYDirection);
        break;
      }
      if (isBottomColision(brick)) {
        bricks[i].style.display = "none";
        setBallYDirection(-ballYDirection);
        break;
      }
      if (isRightCollision(brick)) {
        bricks[i].style.display = "none";
        setBallXDirection(-ballXDirection);
        break;
      }
      if (isLeftCollision(brick)) {
        bricks[i].style.display = "none";
        setBallXDirection(-ballXDirection);
        break;
      }
      if (isCornerCollision(brick)) {
        bricks[i].style.display = "none";
        setBallXDirection(-ballXDirection);
        break;
      }
    }
  }
};

export const isInsideCollisionZone = (brick) => {
  /* considers that each brick has a collision zone which is the area of the brick
    plus the radius of the ball */
  const ball = getBall();
  if (
    ball.offsetLeft >= brick.offsetLeft - BALL_WIDTH &&
    ball.offsetLeft + BALL_WIDTH <=
      brick.offsetLeft + BRICK_WIDTH + BALL_WIDTH &&
    ball.offsetTop >= brick.offsetTop - BALL_WIDTH &&
    ball.offsetTop + BALL_WIDTH <= brick.offsetTop + BRICK_HEIGHT + BALL_WIDTH
  ) {
    return true;
  }
  return false;
};

export const isTopCollision = (brick) => {
  const ball = getBall();
  const YDirection = getBallYDirection();

  if (
    ball.offsetTop + BALL_WIDTH >= brick.offsetTop &&
    ball.offsetLeft + BALL_WIDTH / 2 >= brick.offsetLeft &&
    ball.offsetLeft + BALL_WIDTH / 2 <= brick.offsetLeft + BRICK_WIDTH &&
    YDirection > 0
  ) {
    return true;
  }
  return false;
};

export const isBottomColision = (brick) => {
  const ball = getBall();
  const YDirection = getBallYDirection();

  if (
    ball.offsetTop <= brick.offsetTop + BRICK_HEIGHT &&
    ball.offsetLeft + BALL_WIDTH / 2 >= brick.offsetLeft &&
    ball.offsetLeft + BALL_WIDTH / 2 <= brick.offsetLeft + BRICK_WIDTH &&
    YDirection < 0
  ) {
    return true;
  }
  return false;
};

export const isRightCollision = (brick) => {
  const ball = getBall();
  const XDirection = getBallXDirection();

  if (
    ball.offsetLeft <= brick.offsetLeft + BRICK_WIDTH &&
    ball.offsetTop - BALL_WIDTH / 2 >= brick.offsetTop &&
    ball.offsetTop + BALL_WIDTH / 2 <= brick.offsetTop + BRICK_HEIGHT &&
    XDirection < 0
  ) {
    return true;
  }
  return false;
};

export const isLeftCollision = (brick) => {
  const ball = getBall();
  const XDirection = getBallXDirection();

  if (
    ball.offsetLeft + BALL_WIDTH >= brick.offsetLeft &&
    ball.offsetTop - BALL_WIDTH / 2 >= brick.offsetTop &&
    ball.offsetTop + BALL_WIDTH / 2 <= brick.offsetTop + BRICK_HEIGHT &&
    XDirection > 0
  ) {
    return true;
  }
  return false;
};

export const isCornerCollision = (brick) => {
  const ball = getBall();

  if (
    // bottom right collision
    (ball.offsetLeft + BALL_WIDTH / 2 === brick.offsetLeft + BRICK_WIDTH &&
      ball.offsetTop + BALL_WIDTH / 2 === brick.offsetTop + BRICK_HEIGHT) ||
    // top right collision
    (ball.offsetLeft + BALL_WIDTH / 2 === brick.offsetLeft + BRICK_WIDTH &&
      ball.offsetTop + BALL_WIDTH / 2 === brick.offsetTop) ||
    // top left collision
    (ball.offsetLeft + BALL_WIDTH / 2 === brick.offsetLeft &&
      ball.offsetTop + BALL_WIDTH / 2 === brick.offsetTop) ||
    // left bottom collision
    (ball.offsetLeft + BALL_WIDTH / 2 === brick.offsetLeft &&
      ball.offsetTop + BALL_WIDTH / 2 === brick.offsetTop + BRICK_HEIGHT)
  ) {
    return true;
  }
  return false;
};
