import AI from './AI.js';

export default class Player extends AI {
  constructor() {
    super();
  }
  clickOnCell = (e) => { // Ход игрока. Передает ход компьютеру, если нет выигрышной комбинации
    const _this = this;
    if (this.player === 'user') {
      this.turn(this.id(e.target), 'X');
      if (!this.winCheck())
        this.aiTurn();
    }
  }

  id = (cell) => {
    return Number.parseInt(cell.id);
  }
}