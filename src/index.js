let order = [];
let clickedOrder = [];
let score = 0;

const green = document.querySelector(".green");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const blue = document.querySelector(".blue");

const popupWrapper = document.querySelector(".popup-wrapper");

let shuffleOrder = () => {
  const colorOrder = Math.floor(Math.random() * 4);
  order.push(colorOrder);
  clickedOrder = [];

  for (let i in order) {
    const elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

let lightColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, number - 250);

  setTimeout(() => {
    element.classList.remove("selected");
  }, number);
};

let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length === order.length) {
    alert(`
            Você acertou.
            Pontuação: ${score}.
            Iniciando próximo nível.`);
    nextLevel();
  }
};

let click = (color) => {
  clickedOrder.push(color);
  createColorElement(color).classList.add("selected");

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
  }, 250);
  setTimeout(() => {
    checkOrder();
  }, 400);
};

let createColorElement = (color) => {
  if (color === 0) {
    return green;
  } else if (color === 1) {
    return red;
  } else if (color === 2) {
    return yellow;
  } else if (color === 3) {
    return blue;
  }
};

let nextLevel = () => {
  score++;
  shuffleOrder();
};

let gameOver = () => {
  alert(`
        Pontuação: ${score}.
        Você perdeu o jogo.
        Clique em ok para reiniciar.`);
  order = [];
  clickedOrder = [];

  playGame();
};

let playGame = () => {
  score = 0;
  nextLevel();
};

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

popupWrapper.addEventListener("click", (event) => {
  const classNameOfClickedElement = event.target.classList[0];
  const classNames = ["popup-close", "popup-wrapper", "popup"];

  const shouldClosePopup = classNames.some(
    (className) => className === classNameOfClickedElement
  );

  if (shouldClosePopup) {
    popupWrapper.style.display = "none";
  }
  playGame();
});
