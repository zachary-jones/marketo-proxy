var express = require('express');
var router = express.Router();

router.get('/instapage/', function(req, res, next) {
    res.render('instapage/tests/InstapageTest');
});

module.exports = router;
