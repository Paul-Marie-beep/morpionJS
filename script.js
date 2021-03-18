"use strict";

const boardgame = document.querySelector(".boardgame");
const player1Popup = document.querySelector(".popup-container-1");
const player2Popup = document.querySelector(".popup-container-2");
const victoryPopup = document.querySelector(".victory-popup");
const victoryMessage = document.querySelector(".victory-popup-text");
const endgamePopup = document.querySelector(".endgame-popup");
const victoryPopupButton = document.querySelector(".victory-popup-btn");
const endgamePopupButton = document.querySelector(".endgame-popup-btn");
const endgameMessage = document.querySelector(".endgame-popup-text");
const startPopup = document.querySelector(".beforegame-popup");
const inputPlayer1 = document.querySelector(".form__input--name-player-1");
const inputPlayer2 = document.querySelector(".form__input--name-player-2");
const app = document.querySelector(".app");

let currentPlayer;
let player1;
let player2;
let turnCount;
let winner;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Case Object
class CaseCl {
  constructor(position) {
    this.position = position;
    this.filling;
  }
  fillCase() {
    if (this.filling !== "") {
      console.log("Tu as joué sur une case déja pleine !!");
      console.log("Tu passes ton tour");
      return;
    }
    if (currentPlayer === player1) {
      this.filling = "X";
    } else if (currentPlayer === player2) {
      this.filling = "O";
    }
    turnCount++;
  }

  displayCaseFilling() {
    const givenCase = document.querySelector(`.${this.position}`);
    givenCase.firstElementChild.textContent = this.filling;
  }
}

const caseA1 = new CaseCl("A1");
const caseA2 = new CaseCl("A2");
const caseA3 = new CaseCl("A3");
const caseB1 = new CaseCl("B1");
const caseB2 = new CaseCl("B2");
const caseB3 = new CaseCl("B3");
const caseC1 = new CaseCl("C1");
const caseC2 = new CaseCl("C2");
const caseC3 = new CaseCl("C3");

const allCases = [
  caseA1,
  caseA2,
  caseA3,
  caseB1,
  caseB2,
  caseB2,
  caseB3,
  caseC1,
  caseC2,
  caseC3,
];

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Helpers

const showCasesContent = function () {
  allCases.forEach((item) => item.displayCaseFilling());
};

const showPlayerPopup = function () {
  if (currentPlayer === player1) {
    player1Popup.classList.remove("hidden");
    player2Popup.classList.add("hidden");
  } else if (currentPlayer === player2) {
    player2Popup.classList.remove("hidden");
    player1Popup.classList.add("hidden");
  }
};

const showVictoryPopup = function (winner) {
  victoryPopup.classList.remove("hidden");
  hidePlayer1popup();
  hidePlayer2popup();
  victoryPopupButton.addEventListener("click", startGame);
  victoryMessage.textContent = `Bravo ${winner} !! Tu as gagné !!`;
};

const hideVictoryPopup = function () {
  victoryPopup.classList.add("hidden");
};

const showEndgamePopup = function () {
  endgamePopup.classList.remove("hidden");
  endgamePopup.addEventListener("click", startGame);
  endgameMessage.textContent = "Vous avez perdu tous les deux";
};

const showStartPopup = function () {
  startPopup.classList.remove("hidden");
};

const hideStartPopup = function () {
  startPopup.classList.add("hidden");
};

const hideEndgamePopup = function () {
  endgamePopup.classList.add("hidden");
};

const hidePlayer1popup = function () {
  player1Popup.classList.add("hidden");
};

const hidePlayer2popup = function () {
  player2Popup.classList.add("hidden");
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Functions

const intializeCases = function () {
  allCases.forEach((item) => {
    item.filling = "";
    item.displayCaseFilling();
  });
};

const changeTurn = function () {
  currentPlayer === player1
    ? (currentPlayer = player2)
    : (currentPlayer = player1);
};

const testForPlayer1Win = function () {
  if (
    (caseA1.filling === "X" &&
      caseA2.filling === "X" &&
      caseA3.filling === "X") ||
    (caseB1.filling === "X" &&
      caseB2.filling === "X" &&
      caseB3.filling === "X") ||
    (caseC1.filling === "X" &&
      caseC2.filling === "X" &&
      caseC3.filling === "X") ||
    (caseA1.filling === "X" &&
      caseB1.filling === "X" &&
      caseC1.filling === "X") ||
    (caseA2.filling === "X" &&
      caseB2.filling === "X" &&
      caseC2.filling === "X") ||
    (caseA3.filling === "X" &&
      caseB3.filling === "X" &&
      caseC3.filling === "X") ||
    (caseA1.filling === "X" &&
      caseB2.filling === "X" &&
      caseC3.filling === "X") ||
    (caseA3.filling === "X" && caseB2.filling === "X" && caseC1.filling === "X")
  ) {
    winner = player1;
    showVictoryPopup(winner);
    boardgame.removeEventListener("click", playTurn);
  }
};

const testForPlayer2Win = function () {
  if (
    (caseA1.filling === "O" &&
      caseA2.filling === "O" &&
      caseA3.filling === "O") ||
    (caseB1.filling === "O" &&
      caseB2.filling === "O" &&
      caseB3.filling === "O") ||
    (caseC1.filling === "O" &&
      caseC2.filling === "O" &&
      caseC3.filling === "O") ||
    (caseA1.filling === "O" &&
      caseB1.filling === "O" &&
      caseC1.filling === "O") ||
    (caseA2.filling === "O" &&
      caseB2.filling === "O" &&
      caseC2.filling === "O") ||
    (caseA3.filling === "O" &&
      caseB3.filling === "O" &&
      caseC3.filling === "O") ||
    (caseA1.filling === "O" &&
      caseB2.filling === "O" &&
      caseC3.filling === "O") ||
    (caseA3.filling === "O" && caseB2.filling === "O" && caseC1.filling === "O")
  ) {
    winner = player2;
    showVictoryPopup(winner);
    boardgame.removeEventListener("click", playTurn);
  }
};

const testForWin = function () {
  if (currentPlayer === player1) {
    testForPlayer1Win();
  } else if (currentPlayer === player2) {
    testForPlayer2Win();
  }
  if (winner !== "") return true;
};

const testForEndGame = function () {
  if (winner !== "") return;
  if (turnCount === 9) {
    console.log("Le jeu est fini");
    showEndgamePopup();
    boardgame.removeEventListener("click", playTurn);
    return true;
  }
};

const playTurn = function (e) {
  if (e.target.classList.contains("A1")) {
    caseA1.fillCase();
  } else if (e.target.classList.contains("A2")) {
    caseA2.fillCase();
  } else if (e.target.classList.contains("A3")) {
    caseA3.fillCase();
  } else if (e.target.classList.contains("B1")) {
    caseB1.fillCase();
  } else if (e.target.classList.contains("B2")) {
    caseB2.fillCase();
  } else if (e.target.classList.contains("B3")) {
    caseB3.fillCase();
  } else if (e.target.classList.contains("C1")) {
    caseC1.fillCase();
  } else if (e.target.classList.contains("C2")) {
    caseC2.fillCase();
  } else if (e.target.classList.contains("C3")) {
    caseC3.fillCase();
  }

  showCasesContent();
  if (testForWin() === true) return;
  if (testForEndGame() === true) return;
  changeTurn();
  showPlayerPopup();
};

const startGame = function () {
  app.classList.remove("hidden");
  hideStartPopup();
  hideVictoryPopup();
  hideEndgamePopup();
  turnCount = 0;
  intializeCases();
  player1 = inputPlayer1.value;
  player2 = inputPlayer2.value;
  currentPlayer = player1;
  winner = "";
  player1Popup.classList.remove("hidden");
  boardgame.addEventListener("click", playTurn);
};

const launchGame = function (e) {
  if (e.code === "Enter") {
    startGame();
  }
};

const initGame = function () {
  app.classList.add("hidden");
  startPopup.addEventListener("keydown", launchGame);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

initGame();
