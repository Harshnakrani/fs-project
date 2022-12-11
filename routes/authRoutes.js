var express = require("express");
const { login_view, register, login, logout } = require("../controller/userController");
const { redirectIfAuth } = require("../middleware/authMiddleware");
var router = express.Router();


// user and auth routes

router.get("/", redirectIfAuth, login_view)
router.post("/register",redirectIfAuth, register)
router.post("/login",redirectIfAuth, login)
router.get("/logout",logout)


module.exports = router;