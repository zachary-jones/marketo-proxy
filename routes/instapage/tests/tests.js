var express = require('express');
var router = express.Router();

router.get('/instapage/', function(req, res, next) {
    res.render('instapage/tests/InstapageTest');
});

router.get('/instapageTY/', function(req, res, next) {
    res.render('instapage/tests/InstapageTY');
});

module.exports = router;
