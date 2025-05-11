import { checkBallAndBrickCollisions } from "./collisions.js";
import { createGameBoard } from "./board.js";
import { drawBall, drawBricks, drawPlatform } from "./draw.js";
import {
  PLATFORM_WIDTH,
  BALL_WIDTH,
  BALL_Y_POSITION,
  PLATFORM_HORIZONTAL_MOVEMENT,
} from "./constants.js";

export const gameState = {
  platform: null,
  platformX: null,
  ball: null,
  ballX: null,
  ballY: null,
  ballXDirection: null,
  ballYDirection: null,
  lives: null,
  livesLeft: null,
  bricks: null,
  gameLoopID: null,
};

const gameContainer = document.getElementById("game-container");
const gameContainerPosition = gameContainer.getBoundingClientRect();

const INITIAL_PLATFORM_X_POSITION =
  gameContainerPosition.width / 2 - PLATFORM_WIDTH / 2;
const INITIAL_BALL_X_POSITION =
  gameContainerPosition.width / 2 - BALL_WIDTH / 2;
const INITIAL_BALL_Y_POSITION = gameContainerPosition.height - BALL_Y_POSITION;

const initGameStatus = () => {
  gameState.gameLoopID = undefined;
  gameState.platformX = INITIAL_PLATFORM_X_POSITION;

  initBallCoordinates();
  initiBallDirection();

  drawBricks(gameState.bricks);
  drawBall(gameState.ball, gameState.ballX, gameState.ballY);
  drawPlatform(gameState.platform, gameState.platformX);
};

const startGame = () => {
  createGameBoard(gameContainer);
  setPlatform();
  setBall();
  setLives();
  setBricks();

  initGameStatus();
};

function playGame() {
  checkBallAndBrickCollisions(
    gameState.bricks,
    gameState.ballXDirection,
    gameState.ballYDirection
  );
  moveBall();
  changeBallDirectionOnContact();
  checkGameStatus();

  if (gameIsOver()) {
    startGame();
  }
}

const setPlatform = () => {
  gameState.platform = document.getElementById("platform");
};

const setBall = () => {
  gameState.ball = document.getElementById("ball");
};

const setLives = () => {
  gameState.livesLeft = document.getElementById("lives");
  gameState.lives = 5;
  gameState.livesLeft.textContent = gameState.lives;
};

const setBricks = () => {
  gameState.bricks = Array.from(document.getElementsByClassName("brick"));
};

const initBallCoordinates = () => {
  gameState.ballX = INITIAL_BALL_X_POSITION;
  gameState.ballY = INITIAL_BALL_Y_POSITION;
};

const initiBallDirection = () => {
  gameState.ballXDirection = 1;
  gameState.ballYDirection = -1;
};

const moveBall = () => {
  gameState.ballX += gameState.ballXDirection;
  gameState.ballY += gameState.ballYDirection;

  drawBall(gameState.ball, gameState.ballX, gameState.ballY);
};

const changeBallDirectionOnContact = () => {
  if (ballTouchesPlatform()) {
    gameState.ballYDirection = -gameState.ballYDirection;
  } else if (ballTouchesSideWalls()) {
    gameState.ballXDirection = -gameState.ballXDirection;
  } else if (ballTouchesTop()) {
    gameState.ballYDirection = -gameState.ballYDirection;
  }
};

const ballTouchesPlatform = () => {
  if (
    gameState.ballY === INITIAL_BALL_Y_POSITION &&
    gameState.ballX > gameState.platformX &&
    gameState.ballX < gameState.platformX + 160
  ) {
    return true;
  }
  return false;
};

const ballTouchesSideWalls = () => {
  if (gameState.ballX >= gameContainerPosition.width || gameState.ballX <= 0) {
    return true;
  }
  return false;
};

const ballTouchesTop = () => {
  if (gameState.ballY <= 0) {
    return true;
  }
  return false;
};

const checkGameStatus = () => {
  if (ballTouchesBottom()) {
    gameState.lives--;
    gameState.livesLeft.textContent = gameState.lives;
    clearInterval(gameState.gameLoopID);
    initGameStatus();
  }
};

const ballTouchesBottom = () => {
  if (gameState.ballY === gameContainerPosition.height && gameState.lives > 0) {
    return true;
  }
  return false;
};

const gameIsOver = () => {
  if (gameState.lives === 0) {
    return true;
  }
  return false;
};

const listenForPlatformChanges = (event) => {
  if (event.code === "ArrowRight") {
    if (gameState.platformX < gameContainerPosition.width - PLATFORM_WIDTH) {
      gameState.platformX += PLATFORM_HORIZONTAL_MOVEMENT;
      if (gameState.ballY === INITIAL_BALL_Y_POSITION) {
        gameState.ballX += PLATFORM_HORIZONTAL_MOVEMENT;
      }
    }
  }
  if (event.code === "ArrowLeft") {
    if (gameState.platformX > 0) {
      gameState.platformX -= PLATFORM_HORIZONTAL_MOVEMENT;
      if (gameState.ballY === INITIAL_BALL_Y_POSITION) {
        gameState.ballX -= PLATFORM_HORIZONTAL_MOVEMENT;
      }
    }
  }
  drawBall(gameState.ball, gameState.ballX, gameState.ballY);
  drawPlatform(gameState.platform, gameState.platformX);
};

const listenForBallChanges = (event) => {
  if (event.code === "Space") {
    if (!gameState.gameLoopID) {
      gameState.gameLoopID = setInterval(playGame, 1);
    }
  }
};

document.addEventListener("keydown", (event) => {
  listenForPlatformChanges(event);
  listenForBallChanges(event);
});

startGame();
