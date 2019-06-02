export default class AI {
  // Ход компьютера. Проверка на выигрышную комбинацию. Если true, тогда снимаются все обработчики
  aiTurn = () => {
    const _this = this;
    this.player = 'ai';
    setTimeout(() => {
      _this.turn(_this.aiChoise(), 'O');
      if (_this.winCheck()) {
        const lose = document.createElement('div');
        lose.innerHTML = '<p>Вы проиграли!</p>';
        lose.className = 'result-text';
        document.querySelector('.restart-btn').parentNode.insertBefore(lose, document.querySelector('.restart-btn'));
        _this.player = 'user';
        return _this.disableField();
      }
      return _this.player = 'user';
    }, 1000);
  }

  // Компьютер выбирает ID случайной пустой ячейки
  aiChoise = () => this.id(this.emptyCells()[Math.floor(Math.random() * this.emptyCells().length)])

  // Ставим крестик/нолик, удаляет обработчик с ячейки
  turn = (index, letter) => {
    const _this = this;
    const element = document.getElementById(index);
    if (this.field[index] === undefined) {
      const tie = document.createElement('div');
      tie.innerHTML = '<p>Ничья!</p>';
      tie.className = 'result-text';
      document.querySelector('.restart-btn').parentNode.insertBefore(tie, document.querySelector('.restart-btn'));
      return _this.disableField();
    }

    this.field[index].innerText = letter;
    element.removeEventListener('click', this.clickOnCell);
    element.style.cursor = 'no-drop';
  }
}