var express = require('express');
var router = express.Router();

// home page routes

router.get('/', function(req, res, next) {
    res.render("dashboard")
});

module.exports = router;
