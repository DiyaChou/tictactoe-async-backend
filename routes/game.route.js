const router = require("express").Router();
const gameController = require("../controllers/game.controller");
const {
  userAuthorization,
} = require("../middleware.js/authorization.middleware");

router.get("/", userAuthorization, gameController.viewAllGames);
router.get("/:gameId", userAuthorization, gameController.viewGame);
router.post("/", userAuthorization, gameController.create);
router.put("/:gameId", userAuthorization, gameController.update);

module.exports = router;
