const { default: mongoose } = require("mongoose");
const { GameSchema } = require("./game.schema");

const createGame = (params) => {
  return new Promise((resolve, reject) => {
    try {
      GameSchema.create(params)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const findGameById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      GameSchema.findById(_id)
        .populate("player1", ["_id", "name", "email"])
        .populate("player2", ["_id", "name", "email"])
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const findAllGamesPlayedByPlayerId = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      GameSchema.find({
        $or: [
          { player1: mongoose.Types.ObjectId(_id) },
          { player2: mongoose.Types.ObjectId(_id) },
        ],
      })
        .populate("player1", ["_id", "name"])
        .populate("player2", ["_id", "name"])
        .sort({ updatedAt: -1 })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const checkIfGameAlreadyGoingOn = (player1, player2) => {
  return new Promise((resolve, reject) => {
    try {
      GameSchema.find({
        player1: { $in: [player1, player2] },
        player2: { $in: [player1, player2] },
        status: "ongoing",
      })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createGame,
  findGameById,
  findAllGamesPlayedByPlayerId,
  checkIfGameAlreadyGoingOn,
};
