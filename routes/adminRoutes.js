var express = require("express");
const { appointment_view, appointment_post,test_results } = require("../controller/adminController");
const { authenticated, adminGate } = require("../middleware/authMiddleware");
var router = express.Router();


// user and auth routes

router.get("/appointment",[authenticated,adminGate] ,appointment_view)
router.post("/appointment/save",[authenticated,adminGate] ,appointment_post)
router.get("/results",[authenticated,adminGate] ,test_results)


module.exports = router;