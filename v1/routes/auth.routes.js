const {
  userLogin,
  validateAccessToken,
  refreshToken,
} = require("../controllers/auth.controllers");

const router = require("express").Router();

router.post("/user-login", userLogin);
router.post("/validate-token", validateAccessToken);
router.post("/refresh-token", refreshToken);

module.exports = router;
