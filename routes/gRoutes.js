var express = require("express");
const { g_test_get,check_appointment, save_appointment } = require("../controller/gController");
const { authenticated, driverGate } = require("../middleware/authMiddleware");
var router = express.Router();

// g page routes

router.get("/", [authenticated, driverGate], g_test_get);
router.get("/appointment", [authenticated, driverGate], check_appointment);
router.post("/appointment", [authenticated, driverGate], save_appointment);

module.exports = router;
