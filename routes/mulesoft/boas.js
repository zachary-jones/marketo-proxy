var express = require('express');
var router = express.Router();
var boasApi = require('../../repositories/mulesoft/boas')();

router.get('/getStudentAccountStatus/:domain/:email', function(req, res, next) {
    boasApi.getStudentAccountStatus(req.params['domain'], req.params['email'], req.query.env, function(data) {
        res.send(data);
    })
});

module.exports = router;
