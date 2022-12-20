const mongoose = require("mongoose");
/**
 * player1 initiates a game
 * player1 always plays first
 * more: can include history to see previous board positions
 */
const schema = new mongoose.Schema({
  board: [
    {
      type: String,
    },
  ],
  player1: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  player2: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },

  nextTurn: { type: String, enum: ["player1", "player2"], default: "player1" },

  status: {
    type: String,
    enum: ["ongoing", "draw", "player1 won", "player2 won"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = { GameSchema: mongoose.model("games", schema) };
