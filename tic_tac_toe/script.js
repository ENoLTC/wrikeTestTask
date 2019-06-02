window.onload = function () {
  //Выигрышные комбинации
  const winPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let player = 'user';
  const field = Array.from(document.querySelectorAll('.cell'));
  const id = (cell) => {
    if (cell === undefined)
      return disableField();
    return Number.parseInt(cell.id);
  }
  const emptyCells = () => field.filter(cell => cell.innerText === '');
  // Проверка на одинаковое содержание в массиве ячеек
  const sameCells = (cellsArr) => cellsArr.every(cell => cell.innerText === cellsArr[0].innerText && cell.innerText !== '');

  // Ставит крестик/нолик, удаляет обработчик с ячейки
  const turn = (index, letter) => {
    const element = document.getElementById(index);
    if (field[index] === undefined) {
      const tie = document.createElement('div');
      tie.innerHTML = '<p>Ничья!</p>';
      tie.className = 'result-text';
      document.querySelector('.restart-btn').parentNode.insertBefore(tie, document.querySelector('.restart-btn'));
      return disableField();
    }

    field[index].innerText = letter;
    element.removeEventListener('click', clickOnCell);
    element.style.cursor = 'no-drop';
  }

  // Компьютер выбирает ID случайной пустой ячейки
  const aiChoise = () => id(emptyCells()[Math.floor(Math.random() * emptyCells().length)]);
  // Ход компьютера. Проверка на выигрышную комбинацию. Если true, тогда снимаются все обработчики
  const aiTurn = () => {
    player = 'ai';
    setTimeout(() => {
      turn(aiChoise(), 'O');
      if (winCheck()) {
        const lose = document.createElement('div');
        lose.innerHTML = '<p>Вы проиграли!</p>';
        lose.className = 'result-text';
        document.querySelector('.restart-btn').parentNode.insertBefore(lose, document.querySelector('.restart-btn'));
        player = 'user';
        return disableField();
      }
      return player = 'user';
    }, 1000);
  }

  // Ход игрока. Передает ход компьютеру, если нет выигрышной комбинации
  const clickOnCell = (e) => {
    if (player === 'user') {
      turn(id(e.target), 'X');
      if (!winCheck()) {
        return aiTurn();
      } else {
        const win = document.createElement('div');
        win.innerHTML = '<p>Победа!</p>';
        win.className = 'result-text';
        document.querySelector('.restart-btn').parentNode.insertBefore(win, document.querySelector('.restart-btn'));
        return disableField();
      }
    }
  };

  // Проверка комбинаций. Перебирается массив выигрышных комбинаций
  const winCheck = () => {
    let victory = false;

    winPositions.forEach(arr => {
      const fieldCopy = field;
      // Составление массива из текущих результатов игры по шаблону выигрышного массива
      const winCombination = [fieldCopy[arr[0]], fieldCopy[arr[1]], fieldCopy[arr[2]]];
      // Проверка на соответствие выигрышному варианту
      if (sameCells(winCombination)) {
        victory = true;
        endGame(winCombination);
      }
    });

    return victory;
  };

  const enableField = () => field.forEach(cell => cell.addEventListener('click', clickOnCell));
  const disableField = () => field.forEach(cell => cell.removeEventListener('click', clickOnCell));

  const startGame = () => {
    enableField();
  };

  const restartGame = () => {
    field.forEach(cell => {
      cell.classList.remove('win');
      cell.innerText = '';
      cell.style.cursor = 'pointer';
    });
    if (document.querySelector('.result-text') !== null)
      document.querySelector('.result-text').remove();
    enableField();
  }

  const endGame = (winSeq) => {
    disableField();
    winSeq.forEach(cell => cell.classList.add('win'));
    field.forEach(cell => cell.style.cursor = 'no-drop');
    console.log('Game Over', winSeq);
  }

  document.querySelector('.restart-btn').addEventListener('click', restartGame);
  startGame();
}