import { checkBallAndBrickCollisions } from "./collisions.js";
import { createGameBoard } from "./board.js";
import { drawBall, drawBricks, drawPlatform } from "./draw.js";
import { PLATFORM_WIDTH, BALL_WIDTH, BALL_Y_POSITION } from "./constants.js";

const gameContainer = document.getElementById("game-container");
const gameContainerPosition = gameContainer.getBoundingClientRect();

const INITIAL_PLATFORM_X_POSITION =
  gameContainerPosition.width / 2 - PLATFORM_WIDTH / 2;
const INITIAL_BALL_X_POSITION =
  gameContainerPosition.width / 2 - BALL_WIDTH / 2;
const INITIAL_BALL_Y_POSITION = gameContainerPosition.height - BALL_Y_POSITION;

let platform;
let platformX;

let ball;
let ballX, ballY;

let lives;
let livesLeft;

let ballXDirection;
let ballYDirection;

let bricks;

let gameLoopID;

export const getBall = () => {
  return ball;
};

export const getBallXDirection = () => {
  return ballXDirection;
};

export const getBallYDirection = () => {
  return ballYDirection;
};

export const setBallXDirection = (xDirection) => {
  ballXDirection = xDirection;
};

export const setBallYDirection = (yDirection) => {
  ballYDirection = yDirection;
};

const startGame = () => {
  createGameBoard(gameContainer);
  platform = document.getElementById("platform");
  ball = document.getElementById("ball");
  livesLeft = document.getElementById("lives");
  lives = 5;
  livesLeft.textContent = lives;

  bricks = Array.from(document.getElementsByClassName("brick"));
  initGameStatus();
};

const initBallCoordinates = () => {
  ballX = INITIAL_BALL_X_POSITION;
  ballY = INITIAL_BALL_Y_POSITION;
};

const initiBallDirection = () => {
  ballXDirection = 1;
  ballYDirection = -1;
};

const initGameStatus = () => {
  gameLoopID = undefined;
  platformX = INITIAL_PLATFORM_X_POSITION;

  initBallCoordinates();
  initiBallDirection();

  drawBricks(bricks);
  drawBall(ball, ballX, ballY);
  drawPlatform(platform, platformX);
};

const moveBall = () => {
  ballX += ballXDirection;
  ballY += ballYDirection;

  drawBall(ball, ballX, ballY);
};

const ballTouchesPlatform = () => {
  if (
    ballY === INITIAL_BALL_Y_POSITION &&
    ballX > platformX &&
    ballX < platformX + 160
  ) {
    return true;
  }
  return false;
};

const ballTouchesSideWalls = () => {
  if (ballX >= gameContainerPosition.width || ballX <= 0) {
    return true;
  }
  return false;
};

const ballTouchesTop = () => {
  if (ballY <= 0) {
    return true;
  }
  return false;
};

const changeBallDirectionOnContact = () => {
  if (ballTouchesPlatform()) {
    ballYDirection = -ballYDirection;
  } else if (ballTouchesSideWalls()) {
    ballXDirection = -ballXDirection;
  } else if (ballTouchesTop()) {
    ballYDirection = -ballYDirection;
  }
};

const ballTouchesBottom = () => {
  if (ballY === gameContainerPosition.height && lives > 0) {
    return true;
  }
  return false;
};

const gameIsOver = () => {
  if (lives === 0) {
    return true;
  }
  return false;
};

const checkGameStatus = () => {
  if (ballTouchesBottom()) {
    lives--;
    livesLeft.textContent = lives;
    clearInterval(gameLoopID);
    initGameStatus();
  }
};

function playGame() {
  checkBallAndBrickCollisions(bricks, ballXDirection, ballYDirection);
  moveBall();
  changeBallDirectionOnContact();
  checkGameStatus();

  if (gameIsOver()) {
    startGame();
  }
}

const listenForPlatformChanges = (event) => {
  if (event.code === "ArrowRight") {
    if (platformX < gameContainerPosition.width - 160) {
      platformX += 40;
      if (ballY === INITIAL_BALL_Y_POSITION) {
        ballX += 40;
      }
    }
  }
  if (event.code === "ArrowLeft") {
    if (platformX > 0) {
      platformX -= 40;
      if (ballY === INITIAL_BALL_Y_POSITION) {
        ballX -= 40;
      }
    }
  }
  drawBall(ball, ballX, ballY);
  drawPlatform(platform, platformX);
};

const listenForBallChanges = (event) => {
  if (event.code === "Space") {
    if (!gameLoopID) {
      gameLoopID = setInterval(playGame, 1);
    }
  }
};

document.addEventListener("keydown", (event) => {
  listenForPlatformChanges(event);
  listenForBallChanges(event);
});

startGame();
