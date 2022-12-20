const {
  createGame,
  findGameById,
  findAllGamesPlayedByPlayerId,
} = require("../model/game/game.model");
const { findUserByEmail } = require("../model/user/user.model");
const {
  checkBoardForStatus,
  isMoveValid,
  isTurnValid,
} = require("../utils/game.utils");

const create = async (req, res) => {
  try {
    // const player1Id = req.userId;
    const { player2Email, player1Id } = req.body;
    const player2 = await findUserByEmail(player2Email);
    if (!player2._id) {
      // throw error
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
    return res.status(200).json({ game });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error occured" });
  }
};

const update = async (req, res) => {
  /**
   * checks:
   * isTurnValid
   * isMoveValid
   */
  try {
    // const playerId = req.userId;

    const { gameId, board_pos, playerId } = req.body;
    let isPlayerX;
    let game = await findGameById(gameId);
    if (game.player1.toString() === playerId) isPlayerX = true;
    else if (game.player2.toString() === playerId) isPlayerX = false;
    else {
      // throw error
    }
    // console.log(game);
    const check = isTurnValid(game.nextTurn, isPlayerX ? "player1" : "player2");
    if (!check) throw new Error("This is not your turn.");
    if (game.status !== "ongoing") throw new Error("Game is already over!");

    const result = isMoveValid(game.board, board_pos);

    if (!result) throw new Error("Not a valid move!");
    let newBoard = game.board;
    newBoard[board_pos] = isPlayerX ? "x" : "o";

    game.board = newBoard;
    game.nextTurn = isPlayerX ? "player2" : "player1";
    game.status = checkBoardForStatus(newBoard);

    await game.save();

    return res.status(200).json({ game });
  } catch (error) {
    // todo more error handling
    res.status(400).json({ message: error.message });
  }
};

const viewGame = async (req, res) => {
  const { gameId } = req.params;
  try {
    const game = await findGameById(gameId);

    return res.status(200).json({ game });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const viewAllGames = async (req, res) => {
  try {
    const userId = req.userId;
    const games = await findAllGamesPlayedByPlayerId(userId);
  } catch (error) {}
};

module.exports = { create, update, viewGame, viewAllGames };
