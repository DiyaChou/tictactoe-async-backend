const { isPlayer1X, g_status } = require("../utils/game.utils");

const viewGameParams = (game, playerId) => {
  const { board, player1, player2, nextTurn, status, winner } = game;
  let amIPlayer1;
  if (player1._id.toString() === playerId) amIPlayer1 = true;
  else if (player2._id.toString() === playerId) amIPlayer1 = false;
  else throw new Error("viewGameParams repositories");
  let isMyTurn = "";
  if (status === "ongoing") isMyTurn = isPlayer1X(nextTurn, amIPlayer1); //isPlayer1turn
  let didIWin;
  if (winner) {
    didIWin = isPlayer1X(winner, amIPlayer1);
  }
  const message = g_status({ status, isMyTurn, didIWin });
  const opponent_name = amIPlayer1 ? player2.name : player1.name;
  const params = {
    board,
    opponent_name,
    message,
    status,
    isMyTurn,
    amIX: amIPlayer1 ? "yes" : "no",
  };
  return params;
};

module.exports = { viewGameParams };
