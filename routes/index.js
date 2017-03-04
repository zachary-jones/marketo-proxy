var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render("index", { api: req.app.get("api") });
});

router.get('/help', function (req, res, next) {
    res.render("help", { api: req.app.get("api") });
});

module.exports = router;