var express = require('express');
var router = express.Router();

router.get('/programBuilder/', function(req, res, next) {
    res.render('features/ProgramBuilder');
});

module.exports = router;
