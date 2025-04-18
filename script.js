import {
  isBottomColision,
  isCornerCollision,
  isInsideCollisionZone,
  isLeftCollision,
  isRightCollision,
  isTopCollision,
} from "./collisions.js";
import { BRICK_WIDTH } from "./constants.js";

const container = document.getElementById("game-container");

let platform;
let ball;
let livesLeft;

const containerPosition = container.getBoundingClientRect();

let gameLoopID;
let platformX;
let initialPlatformX = containerPosition.width / 2 - 80;
let initialBallX = containerPosition.width / 2 - 10;
let initialBallY = containerPosition.height - 60;
let ballX, ballY;
let XDirection;
let YDirection;
let bricks;
let lives;
let gameOn;

export const getBall = () => {
  return ball;
};

export const getXDirection = () => {
  return XDirection;
};

export const getYDirection = () => {
  return YDirection;
};

const createHtmlElement = (elementName) => {
  const element = document.createElement("div");
  element.className = elementName;
  element.id = elementName;
  container.appendChild(element);
};

const createBricks = () => {
  container.innerHTML = "";
  createHtmlElement("ball");
  createHtmlElement("platform");
  createHtmlElement("lives");

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 12; col++) {
      const brick = document.createElement("div");
      brick.classList.add("brick");
      if ((col + row) % 2 === 0) {
        brick.classList.add("color-2");
      } else {
        brick.classList.add("color-1");
      }
      if (row === 0) {
        brick.classList.add("row-1");
      } else {
        brick.classList.add("row-2");
      }
      container.appendChild(brick);
    }
  }
};

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
  createBricks();
  platform = document.getElementById("platform");
  ball = document.getElementById("ball");
  livesLeft = document.getElementById("lives");
  lives = 5;
  livesLeft.textContent = lives;

  bricks = Array.from(document.getElementsByClassName("brick"));
  initGameStatus();
};

const initGameStatus = () => {
  gameLoopID = undefined;
  platformX = initialPlatformX;

  initBallCoordinates();
  initiBallDirection();

  updateBricksPositions();

  updateBallPosition(ballX, ballY);
  updatePlatformPosition(platformX);
};

export const checkBallAndBrickCollisions = () => {
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
