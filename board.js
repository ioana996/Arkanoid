const createHtmlElement = (elementName, gameContainer) => {
  const element = document.createElement("div");
  element.className = elementName;
  element.id = elementName;
  gameContainer.appendChild(element);
};

export const createGameBoard = (gameContainer) => {
  gameContainer.innerHTML = "";

  createHtmlElement("ball", gameContainer);
  createHtmlElement("platform", gameContainer);
  createHtmlElement("lives", gameContainer);

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
      gameContainer.appendChild(brick);
    }
  }
};
