const X = "x",
  O = "o";
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cells = document.querySelectorAll("[data-cell]"),
  board = document.getElementById("board"),
  message = document.getElementById("message"),
  msgText = document.querySelector(".w-message"),
  restartBtn = document.getElementById("restart-button");
let nowTurn;

const startGame = () => {
  nowTurn = false;
  cells.forEach((cell) => {
    cell.className = "cell";
    cell.onclick = handleClick;
  });
  setHover();
  message.style.display = "none";
};

const handleClick = (e) => {
  const cell = e.target;
  const current = nowTurn ? O : X;
  cell.classList.add(current);
  if (checkWin(current)) endGame(false);
  else if (
    [...cells].every((c) => c.classList.contains(X) || c.classList.contains(O))
  )
    endGame(true);
  else {
    nowTurn = !nowTurn;
    setHover();
  }
};

const endGame = (draw) => {
  msgText.textContent = draw ? "Draw!" : `${nowTurn ? "O" : "X"} Wins!`;
  cells.forEach((cell) => {
    cell.classList.add("disabled");
  });
  message.style.display = "flex";
};

const setHover = () => (board.className = nowTurn ? O : X);

const checkWin = (curr) =>
  WIN_COMBOS.some((combo) =>
    combo.every((i) => cells[i].classList.contains(curr))
  );

restartBtn.onclick = startGame;
startGame();
