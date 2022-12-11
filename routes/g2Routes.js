var express = require("express");
const { g2_test_view, g2_test_update, check_appointment, save_appointment } = require("../controller/gController");
const { authenticated, driverGate } = require("../middleware/authMiddleware");
var router = express.Router();

//  g2 page routes

router.get("/", [authenticated, driverGate], g2_test_view);
router.get("/appointment", [authenticated, driverGate], check_appointment);
router.post("/appointment", [authenticated, driverGate], save_appointment);
router.post("/update", [authenticated, driverGate], g2_test_update);

module.exports = router;
