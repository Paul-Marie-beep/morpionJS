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
const playerNameOnPlayerPopup1 = document.querySelector(".player-number--1");
const playerNameOnPlayerPopup2 = document.querySelector(".player-number--2");
const player1Symbol = "X";
const player2Symbol = "0";

let currentPlayer;
let player1;
let player2;
let turnCount;
let winner;
let series;

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
      this.filling = player1Symbol;
    } else if (currentPlayer === player2) {
      this.filling = player2Symbol;
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
    playerNameOnPlayerPopup1.textContent = player1;
  } else if (currentPlayer === player2) {
    player2Popup.classList.remove("hidden");
    player1Popup.classList.add("hidden");
    playerNameOnPlayerPopup2.textContent = player2;
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Functions

// On vide les cases
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

// On veut savoir quelle est la série gagnante pour pouvoir la faire clignoter
const victoryDetected = function (series) {
  winner = currentPlayer;
  showVictoryPopup(winner);
  boardgame.removeEventListener("click", playTurn);
};

// On teste pour la victoire et on mémorise la série gagnante. On factorise le symbole pour n'avoir qu'une seule fonction de test
const testForPlayerWin = function (currentPlayerSymbol) {
  if (
    caseA1.filling === currentPlayerSymbol &&
    caseA2.filling === currentPlayerSymbol &&
    caseA3.filling === currentPlayerSymbol
  ) {
    series = "column_A";
    victoryDetected(series);
  } else if (
    caseB1.filling === currentPlayerSymbol &&
    caseB2.filling === currentPlayerSymbol &&
    caseB3.filling === currentPlayerSymbol
  ) {
    series = "column_B";
    victoryDetected(series);
  } else if (
    caseC1.filling === currentPlayerSymbol &&
    caseC2.filling === currentPlayerSymbol &&
    caseC3.filling === currentPlayerSymbol
  ) {
    series = "column_C";
    victoryDetected(series);
  } else if (
    caseA1.filling === currentPlayerSymbol &&
    caseB1.filling === currentPlayerSymbol &&
    caseC1.filling === currentPlayerSymbol
  ) {
    series = "line_1";
    victoryDetected(series);
  } else if (
    caseA2.filling === currentPlayerSymbol &&
    caseB2.filling === currentPlayerSymbol &&
    caseC2.filling === currentPlayerSymbol
  ) {
    series = "line_2";
    victoryDetected(series);
  } else if (
    caseA3.filling === currentPlayerSymbol &&
    caseB3.filling === currentPlayerSymbol &&
    caseC3.filling === currentPlayerSymbol
  ) {
    series = "line_3";
    victoryDetected(series);
  } else if (
    caseA1.filling === currentPlayerSymbol &&
    caseB2.filling === currentPlayerSymbol &&
    caseC3.filling === currentPlayerSymbol
  ) {
    series = "diago_left";
    victoryDetected(series);
  } else if (
    caseA3.filling === currentPlayerSymbol &&
    caseB2.filling === currentPlayerSymbol &&
    caseC1.filling === currentPlayerSymbol
  ) {
    series = "diago_right";
    victoryDetected(series);
  }
};

const testForWin = function () {
  if (currentPlayer === player1) {
    testForPlayerWin(player1Symbol);
  } else if (currentPlayer === player2) {
    testForPlayerWin(player2Symbol);
  }
  if (winner !== "") return true;
};

const testForEndGame = function () {
  if (winner !== "") return;
  if (turnCount === 9) {
    showEndgamePopup();
    boardgame.removeEventListener("click", playTurn);
    return true;
  }
};

const playTurn = function (e) {
  // On remplit la case (l'objet JS en l'occurence)
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
  // On affiche le contenu des cases
  showCasesContent();
  // On vérifie que la partie est toujours en cours
  if (testForWin() === true) return;
  if (testForEndGame() === true) return;
  changeTurn();
  showPlayerPopup();
};

const startGame = function () {
  app.classList.remove("hidden");
  series = "";
  hideStartPopup();
  hideVictoryPopup();
  hideEndgamePopup();
  turnCount = 0;
  intializeCases();
  player1 = inputPlayer1.value;
  player2 = inputPlayer2.value;
  currentPlayer = player1;
  winner = "";
  showPlayerPopup();
  boardgame.addEventListener("click", playTurn);
  startPopup.removeEventListener("keydown", launchGame);
};

const launchGame = function (e) {
  if (e.code === "Enter" && inputPlayer1.value === inputPlayer2.value) {
    alert("Vous devez rentrer deux prénoms différents");
  } else if (
    e.code === "Enter" &&
    (inputPlayer1.value !== "" || inputPlayer2.value !== "")
  ) {
    startGame();
  } else if (
    e.code === "Enter" &&
    (inputPlayer1.value === "" || inputPlayer2.value === "")
  ) {
    alert("Vous devez rentrer un prénom");
  }
};

const initGame = function () {
  app.classList.add("hidden");
  startPopup.addEventListener("keydown", launchGame);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

initGame();
