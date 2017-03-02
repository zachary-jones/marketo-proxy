var express = require('express');
var router = express.Router();

router.get('/InstapageTest1-FT-MS/', function(req, res, next) {
    res.render('instapage/tests/InstapageTest1-FT');
});

router.get('/InstapageTest1-FT-MS-CB/', function(req, res, next) {
    res.render('instapage/tests/InstapageTest4-FT');
});

router.get('/InstapageTest3-NEC-CB/', function(req, res, next) {
    res.render('instapage/tests/InstapageTest3-NEC-CB');
});

router.get('/InstapageTest2-NEC-MS-CB/', function(req, res, next) {
    res.render('instapage/tests/InstapageTest2-NEC-MS-CB');
});

router.get('/instapageTY/', function(req, res, next) {
    res.render('instapage/tests/InstapageTY');
});

module.exports = router;
