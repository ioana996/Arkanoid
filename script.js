const container = document.getElementById("game-container");
const platform = document.getElementById("platform");
const ball = document.getElementById("ball");

const containerPosition = container.getBoundingClientRect();

let gameLoopID;
let moveUp;

let currentPlatformPosition = containerPosition.width / 2 - 80;
let initialBallX = containerPosition.width / 2 - 10;
let initialBallY = containerPosition.height - 60;
let ballX, ballY;

const updateBallPosition = (x, y) => {
  ball.style.left = x + "px";
  ball.style.top = y + "px";
};

const updatePlatformPosition = (x) => {
  platform.style.left = x + "px";
};

const initGameStatus = () => {
  moveUp = true;
  gameLoopID = undefined;

  ballX = initialBallX;
  ballY = initialBallY;
  updateBallPosition(ballX, ballY);
  updatePlatformPosition(currentPlatformPosition);
};

function moveBall() {
  if (moveUp) {
    ballX += 1;
    ballY -= 1;
  } else {
    ballX -= 1;
    ballY += 1;
  }

  if (ballY <= 0 || ballX > containerPosition.width) {
    moveUp = false;
  }
  if (ballY >= initialBallY) {
    clearInterval(gameLoopID);
    initGameStatus();
  }

  updateBallPosition(ballX, ballY);
}

const listenForPlatformChanges = (event) => {
  if (event.code === "ArrowRight") {
    if (currentPlatformPosition < containerPosition.width - 160) {
      currentPlatformPosition += 40;
    }
  }
  if (event.code === "ArrowLeft") {
    if (currentPlatformPosition > 0) {
      currentPlatformPosition -= 40;
    }
  }
  updatePlatformPosition(currentPlatformPosition);
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
