const isMoveValid = (board, board_pos) => {
  if (board_pos < 0 || board_pos > 8) return false;
  return board[board_pos] === "" ? true : false;
};

const isTurnValid = (nextTurn, player) => {
  return nextTurn === player ? true : false;
};

const checkBoardForStatus = (board) => {
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
      result = "won";
      break;
    }

    emptyFlag &&
      element.forEach((item) => {
        if (!item) emptyFlag = 0;
      });
  }

  return result ? result : emptyFlag ? "drawn" : "ongoing";
};

const isPlayer1X = (x, amIPlayer1) => {
  if (x === "player1") {
    if (amIPlayer1) return true;
    else return false;
  } else if (x === "player2") {
    if (amIPlayer1) return false;
    else return true;
  } else {
    throw new Error("invalid parameters");
  }
};

const g_status = ({ status, isMyTurn, didIWin }) => {
  {
    switch (status) {
      case "won":
        if (didIWin) return "You Won";
        else return "You Lost";
      case "drawn":
        return "It's a draw";
      case "ongoing":
        if (isMyTurn) return "your move";
        else return "their move";
      default:
        break;
    }
  }
};

module.exports = {
  checkBoardForStatus,
  isMoveValid,
  isTurnValid,
  isPlayer1X,
  g_status,
};
