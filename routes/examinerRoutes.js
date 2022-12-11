var express = require("express");
const { authenticated, examinerGate } = require("../middleware/authMiddleware");

const { examiner_view, examiner_assess , examiner_assess_save} = require("../controller/examinerController");
var router = express.Router();


// user and auth routes

router.get("/", [authenticated, examinerGate], examiner_view)
router.get("/assess/:id", [authenticated, examinerGate], examiner_assess)
router.post("/assess/save", [authenticated, examinerGate], examiner_assess_save)


module.exports = router;
