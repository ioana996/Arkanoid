const platform = document.getElementById("platform");
const platformPosition = platform.getBoundingClientRect();

const container = document.getElementById("game-container");
const containerPosition = container.getBoundingClientRect();
platform.style.left = containerPosition.width / 2 - 80 + "px";
let currentPosition = platform.style.left;

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowRight") {
    if (parseInt(currentPosition) < containerPosition.width - 160) {
      currentPosition = parseFloat(currentPosition) + 40 + "px";
    }
  }
  if (event.code === "ArrowLeft") {
    if (parseInt(currentPosition) > 0) {
      currentPosition = parseFloat(currentPosition) - 40 + "px";
    }
  }
  platform.style.left = currentPosition;
});

const ball = document.getElementById("ball");
ball.style.left = containerPosition.width / 2 - 10 + "px";
ball.style.top = containerPosition.height - 60 + "px";
let previousXPosition = parseFloat(ball.style.left);
let previousYPosition = parseFloat(ball.style.top);

function moveBall() {
  if (ball.style.left < 1280 - 20) {
    ball.style.left = previousXPosition + 1 + "px";
  } else {
    ball.style.left = previousXPosition - 1 + "px";
  }

  if (ball.style.top > 0) {
    ball.style.top = previousYPosition - 1 + "px";
  } else {
    ball.style.top = previousYPosition + 1 + "px";
  }

  //   ball.style.left = previousXPosition + 1 + "px";
  //   ball.style.top = previousYPosition - 1 + "px";

  previousXPosition = parseFloat(ball.style.left);
  previousYPosition = parseFloat(ball.style.top);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    setInterval(moveBall, 1);
  }
});
