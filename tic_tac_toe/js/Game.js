import Player from './Player.js';

export default class TicTacToe extends Player {
  constructor() {
    super();
    this.player = 'user';
    // Выигрышные комбинации
    this.winPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    this.field = Array.from(document.querySelectorAll('.cell'));
    this.button = document.querySelector('.restart-btn').addEventListener('click', this.restartGame);
  }

  emptyCells = () => this.field.filter(cell => cell.innerText === '')

  // Проверка на одинаковое содержание в массиве ячеек
  sameCells = (cellsArr) => cellsArr.every(cell => cell.innerText === cellsArr[0].innerText && cell.innerText !== '');

  // Проверка комбинаций. Перебирается массив выигрышных комбинаций
  winCheck = () => {
    let victory = false;

    this.winPositions.forEach(arr => {
      const fieldCopy = this.field;
      // Составление массива из текущих результатов игры по шаблону выигрышного массива
      const winCombination = [fieldCopy[arr[0]], fieldCopy[arr[1]], fieldCopy[arr[2]]];
      // Проверка на соответствие выигрышному варианту
      if (this.sameCells(winCombination)) {
        victory = true;
        this.endGame(winCombination);
      }
    });

    return victory;
  }

  enableField = () => {
    return this.field.forEach(cell => cell.addEventListener('click', this.clickOnCell));
  }

  disableField = () => {
    return this.field.forEach(cell => cell.removeEventListener('click', this.clickOnCell));
  }

  restartGame = () => {
    this.field.forEach(cell => {
      cell.classList.remove('win');
      cell.innerText = '';
      cell.style.cursor = 'pointer';
    });
    if (document.querySelector('.result-text') !== null) {
      document.querySelector('.result-text').remove();
    }
    return this.enableField();
  }

  endGame = (winSeq) => {
    this.disableField();
    winSeq.forEach(cell => cell.classList.add('win'));
    this.field.forEach(cell => cell.style.cursor = 'no-drop');
    console.log('Game Over', winSeq);
  }
}