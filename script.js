const container = document.getElementById("game-container");
const platform = document.getElementById("platform");
const ball = document.getElementById("ball");
const initialBricks = document.getElementsByClassName("brick");
const livesLeft = document.getElementById("lives");

const containerPosition = container.getBoundingClientRect();
const BRICK_WIDTH = 80;
const BALL_WIDTH = 20;
const BRICK_HEIGHT = 40;

let gameLoopID;
let platformX;
let initialPlatformX = containerPosition.width / 2 - 80;
let initialBallX = containerPosition.width / 2 - 10;
let initialBallY = containerPosition.height - 60;
let ballX, ballY;
let XDirection;
let YDirection;
// let bricksPositions;
let bricks;
let lives;
let gameOn;

// let clonedBricks = Array.from(initialBricks);
// console.log("array", clonedBricks);

const initBallCoordinates = () => {
  ballX = initialBallX;
  ballY = initialBallY;
};

const initiBallDirection = () => {
  XDirection = 1;
  YDirection = -1;
};

const updateBricksPositions = () => {
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

const updateBallPosition = (x, y) => {
  ball.style.left = x + "px";
  ball.style.top = y + "px";
};

const updatePlatformPosition = (x) => {
  platform.style.left = x + "px";
};

const restartGame = () => {
  gameOn = true;
  lives = 5;
  livesLeft.textContent = lives;
  initGameStatus();
};

const initGameStatus = () => {
  gameLoopID = undefined;
  platformX = initialPlatformX;
  // if (!gameOn) {
  //   console.log("restart game");
  //   restartGame();
  // }

  initBallCoordinates();
  initiBallDirection();
  bricks = Array.from(initialBricks);
  // bricks = _.cloneDeep(clonedBricks);
  // console.log("cloned ", bricks);
  // bricksPositions = bricks.map((brick) => brick.getBoundingClientRect());
  updateBricksPositions();

  updateBallPosition(ballX, ballY);
  updatePlatformPosition(platformX);
};

const isInsideCollisionZone = (brick) => {
  /* considers that each brick has a collision zone which is the area of the brick
  plus the radius of the ball */
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

const isTopCollision = (brick) => {
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

const isBottomColision = (brick) => {
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

const isRightCollision = (brick) => {
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

const isLeftCollision = (brick) => {
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

const isCornerCollision = (brick) => {
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

const checkBallAndBrickCollisions = () => {
  for (let i = 0; i < bricks.length; i++) {
    const brick = bricks[i];
    if (isInsideCollisionZone(brick)) {
      if (isTopCollision(brick)) {
        bricks[i].style.display = "none";
        YDirection = -YDirection;
        break;
      }
      if (isBottomColision(brick)) {
        bricks[i].style.display = "none";
        YDirection = -YDirection;
        break;
      }
      if (isRightCollision(brick)) {
        bricks[i].style.display = "none";
        XDirection = -XDirection;
        break;
      }
      if (isLeftCollision(brick)) {
        bricks[i].style.display = "none";
        XDirection = -XDirection;
        break;
      }
      if (isCornerCollision(brick)) {
        bricks[i].style.display = "none";
        XDirection = -XDirection;
        break;
      }
    }
  }
};

function moveBall() {
  checkBallAndBrickCollisions();

  ballX += XDirection;
  ballY += YDirection;

  updateBallPosition(ballX, ballY);

  if (ballY === initialBallY && ballX > platformX && ballX < platformX + 160) {
    YDirection = -YDirection;
  } else {
    if (ballX >= containerPosition.width || ballX <= 0) {
      XDirection = -XDirection;
    }

    if (ballY <= 0) {
      YDirection = -YDirection;
    }
  }

  if (ballY === containerPosition.height && lives > 0) {
    lives--;
    livesLeft.textContent = lives;
    clearInterval(gameLoopID);
    initGameStatus();
  }
  if (lives === 0) {
    gameOn = false;
    restartGame();
  }
}

const listenForPlatformChanges = (event) => {
  if (event.code === "ArrowRight") {
    if (platformX < containerPosition.width - 160) {
      platformX += 40;
      if (ballY === initialBallY) {
        ballX += 40;
      }
    }
  }
  if (event.code === "ArrowLeft") {
    if (platformX > 0) {
      platformX -= 40;
      if (ballY === initialBallY) {
        ballX -= 40;
      }
    }
  }
  updateBallPosition(ballX, ballY);
  updatePlatformPosition(platformX);
};

const listenForBallChanges = (event) => {
  if (event.code === "Space") {
    if (!gameLoopID) {
      gameLoopID = setInterval(moveBall, 1);
    }
  }
};

document.addEventListener("keydown", (event) => {
  listenForPlatformChanges(event);
  listenForBallChanges(event);
});

restartGame();
