const container = document.getElementById("game-container");
const platform = document.getElementById("platform");
const ball = document.getElementById("ball");

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
let bricksPositions;
let bricks;

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
  let initialCoordinate = 0;
  bricks.forEach((brick) => {
    if (numOfBricksPerRow % 16 === 0) {
      initialCoordinate = 0;
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

const initGameStatus = () => {
  gameLoopID = undefined;
  platformX = initialPlatformX;

  initBallCoordinates();
  initiBallDirection();

  bricks = Array.from(document.getElementsByClassName("brick"));
  bricksPositions = bricks.map((brick) => brick.getBoundingClientRect());
  updateBricksPositions();

  updateBallPosition(ballX, ballY);
  updatePlatformPosition(platformX);
};

const isInsideCollisionZone = (brick) => {
  if (
    ball.offsetLeft >= brick.offsetLeft - BALL_WIDTH &&
    ball.offsetLeft + BALL_WIDTH <=
      brick.offsetLeft + BRICK_WIDTH + BALL_WIDTH &&
    ball.offsetTop >= brick.offsetTop - BALL_WIDTH &&
    ball.offsetTop <= brick.offsetTop + BRICK_HEIGHT
  ) {
    if (
      ball.offsetLeft + BALL_WIDTH == brick.offsetLeft ||
      ball.offsetLeft == brick.offsetLeft + BRICK_WIDTH
    ) {
      XDirection = -XDirection;
    }
    if (
      ball.offsetTop + BALL_WIDTH == brick.offsetTop ||
      ball.offsetTop == brick.offsetTop + BRICK_HEIGHT
    ) {
      YDirection = -YDirection;
    }
    brick.style.display = "none";

    // brick.style.display = "none";
  }
};

const checkBallAndBrickCollisions = () => {
  //   bricks = Array.from(document.getElementsByClassName("brick"));

  //   console.log("Length", bricks.length);
  //   console.log(bricks[1].offsetLeft);
  //   console.log(bricks[1].offsetTop);
  //   console.log(ball.offsetLeft);
  //   console.log(ball.offsetTop - 20);
  for (let i = 0; i < bricks.length; i++) {
    // if (
    //   ball.offsetLeft >= bricks[i].offsetLeft - BALL_WIDTH &&
    //   ball.offsetLeft + BALL_WIDTH <=
    //     bricks[i].offsetLeft + BRICK_WIDTH + BALL_WIDTH &&
    //   ball.offsetTop >= bricks[i].offsetTop - BALL_WIDTH &&
    //   ball.offsetTop <= bricks[i].offsetTop + BRICK_HEIGHT
    // ) {
    //   if (
    //     ball.offsetLeft + BALL_WIDTH == bricks[i].offsetLeft ||
    //     ball.offsetLeft == bricks[i].offsetLeft + BRICK_WIDTH
    //   ) {
    //     XDirection = -XDirection;
    //   }
    //   if (
    //     ball.offsetTop == bricks[i].offsetTop + BRICK_HEIGHT &&
    //     i - 1 >= 0 &&
    //     ball.offsetTop == bricks[i - 1].offsetTop + BRICK_HEIGHT
    //   ) {
    //     YDirection = -YDirection;
    //   }
    //   if (ball.offsetTop + BALL_WIDTH == bricks[i].offsetTop) {
    //     YDirection = -YDirection;
    //   }
    //   bricks[i].style.display = "none";
    // }
    isInsideCollisionZone(bricks[i]);
    // if (
    //   bricks[i].offsetTop - 40 === ball.offsetTop &&
    //   ball.offsetLeft >= bricks[i].offsetLeft &&
    //   ball.offsetLeft + 20 <= bricks[i].offsetLeft + 80
    // ) {
    //   //   bricks[i].remove();
    //   bricks[i].style.display = "none";
    // }
  }

  //   for (let i = 0; i < bricks.length; i++) {
  //     console.log("i was here ", bricksPositions[i].bottom, ballY);
  //     if (
  //       Math.trunc(bricksPositions[i].bottom) === Math.trunc(ballY - 20) &&
  //       Math.trunc(ballX) >= Math.trunc(bricksPositions[i].left) &&
  //       Math.trunc(ballX) <= Math.trunc(bricksPositions[i].right)
  //     ) {
  //       bricks[i].remove();
  //     }
  //   }
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

  if (ballY >= containerPosition.height) {
    clearInterval(gameLoopID);
    initGameStatus();
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

initGameStatus();
