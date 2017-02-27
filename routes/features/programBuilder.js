var express = require('express');
var router = express.Router();

router.get('/programBuilder/', function(req, res, next) {
    res.render('instapage/tests/ProgramBuilder');
});

module.exports = router;
