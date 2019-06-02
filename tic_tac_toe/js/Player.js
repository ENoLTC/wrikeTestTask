import AI from './AI.js';

export default class Player extends AI {
  constructor() {
    super();
  }
  // Ход игрока. Передает ход компьютеру, если нет выигрышной комбинации
  clickOnCell = (e) => {
    const _this = this;
    if (this.player === 'user') {
      _this.turn(_this.id(e.target), 'X');
      if (!_this.winCheck()) {
        return _this.aiTurn();
      } else {
        const win = document.createElement('div');
        win.innerHTML = '<p>Победа!</p>';
        win.className = 'result-text';
        document.querySelector('.restart-btn').parentNode.insertBefore(win, document.querySelector('.restart-btn'));
        return _this.disableField();
      }
    }
  }

  id = (cell) => {
    if (cell === undefined)
      return this.disableField();
    return Number.parseInt(cell.id);
  }
}