window.onload = function () {
  const winPositions = [ //Выигрышные комбинации
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
  const id = (cell) => Number.parseInt(cell.id); // ID ячейки в числовом формате
  const emptyCells = () => field.filter(cell => cell.innerText === '');
  const sameCells = (cellsArr) => cellsArr.every(cell => cell.innerText === cellsArr[0].innerText && cell.innerText !== '');  // Проверка на одинаковое содержание в массиве ячеек

  const turn = (index, letter) => { // Ставит крестик/нолик, удаляет обработчик с ячейки
    const element = document.getElementById(index);

    field[index].innerText = letter;
    element.removeEventListener('click', clickOnCell);
    element.style.cursor = 'no-drop';
  }
  const aiChoise = () => id(emptyCells()[Math.floor(Math.random() * emptyCells().length)]); // Компьютер выбирает ID случайной пустой ячейки
  const aiTurn = () => { // Ход компьютера. Проверка на выигрышную комбинацию. Если true, тогда снимаются все обработчики
    player = 'ai';
    setTimeout(() => {
      turn(aiChoise(), 'O');
      if (winCheck())
        disableField();
      player = 'user';
    }, 1000);
  }

  const clickOnCell = (e) => { // Ход игрока. Передает ход компьютеру, если нет выигрышной комбинации
    if (player === 'user') {
      turn(id(e.target), 'X');
      if (!winCheck())
        aiTurn();
    }
  };

  const winCheck = () => { // Проверка комбинаций. Перебирается массив выигрышных комбинаций
    let victory = false;

    winPositions.forEach(arr => {
      const fieldCopy = field;
      const winCombination = [fieldCopy[arr[0]], fieldCopy[arr[1]], fieldCopy[arr[2]]]; // Составление массива из текущих результатов игры по шаблону выигрышного массива
      if (sameCells(winCombination)) { // Проверка на соответствие выигрышному варианту
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
    startGame();
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