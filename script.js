const container = document.getElementById("game-container");
const platform = document.getElementById("platform");
const ball = document.getElementById("ball");

const containerPosition = container.getBoundingClientRect();

let gameLoopID;
let platformX;
let initialPlatformX = containerPosition.width / 2 - 80;
let initialBallX = containerPosition.width / 2 - 10;
let initialBallY = containerPosition.height - 60;
let ballX, ballY;
let XDirection;
let YDirection;

const initBallCoordinates = () => {
  ballX = initialBallX;
  ballY = initialBallY;
};

const initiBallDirection = () => {
  XDirection = 1;
  YDirection = -1;
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

  updateBallPosition(ballX, ballY);
  updatePlatformPosition(platformX);
};

function moveBall() {
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
    }
  }
  if (event.code === "ArrowLeft") {
    if (platformX > 0) {
      platformX -= 40;
    }
  }
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
