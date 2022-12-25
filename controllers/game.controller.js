const {
  createGame,
  findGameById,
  findAllGamesPlayedByPlayerId,
  checkIfGameAlreadyGoingOn,
} = require("../model/game/game.model");
const { findUserByEmail } = require("../model/user/user.model");
const { viewGameParams } = require("../repository/game.respositories");
const {
  checkBoardForStatus,
  isMoveValid,
  isTurnValid,
  isPlayer1X,
} = require("../utils/game.utils");

const create = async (req, res) => {
  try {
    const player1Id = req.userId;
    const { email } = req.body;
    const player2 = await findUserByEmail(email);
    if (!player2) {
      // throw error
      throw new Error("no player found with this email");
    }
    if (player1Id === player2._id.toString()) {
      throw new Error("cannot play with yourself");
    }

    const check = await checkIfGameAlreadyGoingOn(player1Id, player2._id);
    if (check.length > 0) {
      throw new Error("cannot start a new game without ending ongoing game");
    }

    const board = new Array(9).fill("");
    const params = {
      board,
      player1: player1Id,
      player2: player2._id,
      nextTurn: "player1",
      status: "ongoing",
    };

    const game = await createGame(params);
    return res
      .status(200)
      .json({ gameId: game._id, message: "action was successful" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  /**
   * checks:
   * isTurnValid
   * isMoveValid
   *
   * req.body:
   * gameId,
   * board_pos
   */
  try {
    const playerId = req.userId;
    const { gameId } = req.params;
    const { board_pos } = req.body;
    let isPlayerX;
    let game = await findGameById(gameId);
    if (game.player1._id.toString() === playerId) isPlayerX = true;
    else if (game.player2._id.toString() === playerId) isPlayerX = false;
    else {
      // throw error
      throw new Error("Player not found");
    }
    const check = isTurnValid(game.nextTurn, isPlayerX ? "player1" : "player2");
    if (!check) throw new Error("It is not your turn.");
    if (game.status !== "ongoing") throw new Error("Game is already over!");

    const result = isMoveValid(game.board, board_pos);

    if (!result) throw new Error("Not a valid move!");
    let newBoard = game.board;
    newBoard[board_pos] = isPlayerX ? "x" : "o";
    const status = checkBoardForStatus(newBoard);
    game.board = newBoard;
    game.nextTurn = isPlayerX ? "player2" : "player1";
    game.status = status;
    if (status === "won") game.winner = isPlayerX ? "player1" : "player2";
    game.updatedAt = new Date();

    await game.save();
    const params = viewGameParams(game, playerId);

    return res.status(200).json(params);
  } catch (error) {
    // todo more error handling
    return res.status(400).json({ message: error.message });
  }
};

const viewGame = async (req, res) => {
  const { gameId } = req.params;
  const playerId = req.userId;

  try {
    const game = await findGameById(gameId);
    if (
      game.player1._id.toString() === playerId ||
      game.player2._id.toString() === playerId
    ) {
      const params = viewGameParams(game, playerId);
      return res.status(200).json(params);
    }

    return res
      .status(401)
      .json({ message: "You are not authorized to see this game" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const viewAllGames = async (req, res) => {
  try {
    const userId = req.userId;
    const games = await findAllGamesPlayedByPlayerId(userId);
    const result = games.map((element) => {
      const {
        player1,
        player2,
        _id,
        status,
        nextTurn,
        updatedAt,
        winner,
        createdAt,
      } = element;
      let amIPlayer1;
      if (player1._id.toString() === userId) amIPlayer1 = true;
      else if (player2._id.toString() === userId) amIPlayer1 = false;
      else throw new Error("error occured");

      let isMyTurn = "";
      if (status === "ongoing") isMyTurn = isPlayer1X(nextTurn, amIPlayer1);

      let didIWin;
      if (winner) didIWin = isPlayer1X(winner, amIPlayer1); //isPlayer1winner
      return {
        game_id: _id,
        opponent_name: amIPlayer1 ? player2.name : player1.name,
        status: status,
        isMyTurn: isMyTurn,
        lastUpdated: updatedAt,
        createdAt,
        winner: winner ? (didIWin === true ? "You" : "they") : null,
      };
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { create, update, viewGame, viewAllGames };
