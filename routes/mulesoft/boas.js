var express = require('express');
var router = express.Router();

router.get('/getAccountStatus/:domain/:email', function(req, res, next) {
    res.send('mulesoft/boas/CheckStudent');
});

module.exports = router;
