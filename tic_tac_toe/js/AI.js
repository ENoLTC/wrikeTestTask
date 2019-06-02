export default class AI {
  aiTurn = () => { // Ход компьютера. Проверка на выигрышную комбинацию. Если true, тогда снимаются все обработчики
    const _this = this;
    this.player = 'ai';
    setTimeout(() => {
      _this.turn(_this.aiChoise(), 'O');
      if (_this.winCheck())
        _this.disableField();
      _this.player = 'user';
    }, 1000);
  }

  aiChoise = () => { // Компьютер выбирает ID случайной пустой ячейки
    return this.id(this.emptyCells()[Math.floor(Math.random() * this.emptyCells().length)]);
  }

  turn = (index, letter) => { // Ставит крестик/нолик, удаляет обработчик с ячейки
    const element = document.getElementById(index);

    this.field[index].innerText = letter;
    element.removeEventListener('click', this.clickOnCell);
    element.style.cursor = 'no-drop';
  }
}