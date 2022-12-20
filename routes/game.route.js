const router = require("express").Router();
const gameController = require("../controllers/game.controller");

router.get("/", gameController.viewAllGames);
router.get("/:gameId", gameController.viewGame);
router.post("/", gameController.create);
router.put("/", gameController.update);

module.exports = router;
