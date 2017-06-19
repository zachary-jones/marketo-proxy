var express = require('express');
var router = express.Router();

/**
 * MS: multistep
 * CB: condistional branching
 * SD: set defaults
 */

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

router.get('/InstapageTest2-NEC-MS-CB-SD/', function(req, res, next) {
    res.render('instapage/tests/InstapageTest2-NEC-MS-CB-SD');
});

router.get('/instapageTest6-JU/', function(req, res, next) {
    res.render('instapage/tests/instapageTest6-JU');
});

router.get('/instapageTY/', function(req, res, next) {
    res.render('instapage/tests/InstapageTY');
});

router.get('/instapageTest7-FT-degreeTest/', function(req, res, next) {
    res.render('instapage/tests/InstapageTest7-FT-degreeTest');
});

router.get('/instapageTest8-phoneNumberReplacement/', function(req, res, next) {
    res.render('instapage/tests/InstapageTest8-JU-phoneNumberReplacement');
});

module.exports = router;
