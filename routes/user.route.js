const router = require("express").Router();
const userController = require("../controllers/user.controller");
const {
  newUserValidation,
  loginValidation,
} = require("../middleware.js/formValidation.middleware");

router.post("/login", loginValidation, userController.login);
router.post("/register", newUserValidation, userController.register);

module.exports = router;
