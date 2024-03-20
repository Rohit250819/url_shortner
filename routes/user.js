const express = require("express");
const { handle_user_sign_up, handle_user_log_in } = require("../controllers/user");

const router = express.Router();

router.post("/", handle_user_sign_up);
router.post("/login", handle_user_log_in);

module.exports = router;