window.onload = function () {
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

  const field = () => Array.from(document.querySelectorAll('.cell'));
  const id = (cell) => Number.parseInt(cell.id);
  const emptyCells = () => field().filter(cell => cell.innerText === '');
  const sameCells = (cellsArr) => cellsArr.every(cell => cell.innerText === cellsArr[0].innerText && cell.innerText !== '');

  const turn = (index, letter) => field()[index].innerText = letter;
  const aiChoise = () => id(emptyCells()[Math.floor(Math.random() * emptyCells().length)]);
  const aiTurn = () => {
    disableField();
    setTimeout(() => {
      turn(aiChoise(), 'O');
      if (!winCheck())
        enableField();
    }, 1000);
  }

  const clickOnCell = (e) => {
    console.log(id(e.target));
    turn(id(e.target), 'X');
    if (!winCheck())
      aiTurn();
  };
  const winCheck = () => {
    let victory = false;

    winPositions.forEach(arr => {
      const fieldC = field();
      const seq = [fieldC[arr[0]], fieldC[arr[1]], fieldC[arr[2]]];
      if (sameCells(seq)) {
        victory = true;
        endGame(seq);
      }
    })

    return victory;
  };

  const enableField = () => field().forEach(cell => cell.addEventListener('click', clickOnCell));
  const disableField = () => field().forEach(cell => cell.removeEventListener('click', clickOnCell));

  const startGame = () => {
    enableField();
  };
  const endGame = (winSeq) => {
    disableField();
    winSeq.forEach(cell => cell.classList.add('win'));

    console.log('Game Over', winSeq);
  }

  startGame();
}