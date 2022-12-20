const isMoveValid = (board, board_pos) => {
  if (board_pos < 0 || board_pos > 8) return false;
  return board[board_pos] === "" ? true : false;
};

const isTurnValid = (nextTurn, player) => {
  return nextTurn === player ? true : false;
};

const checkBoardForStatus = (board) => {
  console.log(board);
  const winning_condition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let result;
  let emptyFlag = 1;

  for (i = 0; i < 8; i++) {
    element = winning_condition[i];
    if (
      (board[element[0]] === "o" || board[element[0]] === "x") &&
      (board[element[1]] === "o" || board[element[1]] === "x") &&
      (board[element[2]] === "o" || board[element[2]] === "x") &&
      board[element[0]] === board[element[1]] &&
      board[element[1]] === board[element[2]]
    ) {
      result = board[element[0]] === "x" ? "player1 won" : "player2 won";
      break;
    }

    emptyFlag &&
      element.forEach((item) => {
        if (!item) emptyFlag = 0;
      });
  }

  console.log(emptyFlag);

  return result ? result : emptyFlag ? "draw" : "ongoing";
};

module.exports = {
  checkBoardForStatus,
  isMoveValid,
  isTurnValid,
};
