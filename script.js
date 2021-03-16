"use strict";

const boardgame = document.querySelector(".boardgame");
const player1Popup = document.querySelector(".popup-container-1");
const player2Popup = document.querySelector(".popup-container-2");
const victoryPopup = document.querySelector(".victory-popup");
const bravo = document.querySelector(".bravo");
const victoryPopupButton = document.querySelector(".victory-popup-btn");

let player;
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
    if (player === "player1") {
      this.filling = "X";
    } else if (player === "player2") {
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

// Functions

const intializeCases = function () {
  allCases.forEach((item) => {
    item.filling = "";
    item.displayCaseFilling();
  });
};

const changeTurn = function () {
  player === "player1" ? (player = "player2") : (player = "player1");
};

const showCasesContent = function () {
  allCases.forEach((item) => item.displayCaseFilling());
};

const showPlayerPopup = function () {
  if (player === "player1") {
    player1Popup.classList.remove("hidden");
    player2Popup.classList.add("hidden");
  } else if (player === "player2") {
    player2Popup.classList.remove("hidden");
    player1Popup.classList.add("hidden");
  }
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
    console.log("Joueur 1 gagné");
    winner = "player1";
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
    console.log("Joueur 2 gagné");
    winner = "player2";
    showVictoryPopup(winner);
    boardgame.removeEventListener("click", playTurn);
  }
};

const showVictoryPopup = function (winner) {
  victoryPopup.classList.remove("hidden");
  victoryPopupButton.addEventListener("click", initGame);
  bravo.insertAdjacentHTML("afterbegin", winner);
};

const testForWin = function () {
  if (player === "player1") {
    testForPlayer1Win();
  } else if (player === "player2") {
    testForPlayer2Win();
  }
  if (winner !== "") return true;
};

const testForEndGame = function () {
  if (winner !== "") return;
  if (turnCount === 9) {
    console.log("Le jeu est fini");
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

const initGame = function () {
  victoryPopup.classList.add("hidden");
  turnCount = 0;
  intializeCases();
  player = "player1";
  winner = "";
  player1Popup.classList.remove("hidden");
  boardgame.addEventListener("click", playTurn);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

initGame();
