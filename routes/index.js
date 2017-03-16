var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render("index", { api: req.app.get("api") });
});

router.get('/help - Marketing', function (req, res, next) {
    res.render("help", { api: req.app.get("api") });
});

router.get('/help - Enrollment Team', function (req, res, next) {
    res.render("helpEnroll", { api: req.app.get("api") });
});

module.exports = router;