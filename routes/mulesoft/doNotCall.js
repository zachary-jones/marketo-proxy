var express = require('express');
var router = express.Router();
var unsubscribe = require('../../repositories/mulesoft/doNotCall')();

router.get('/', function(req, res, next) {
    res.render('mulesoft/doNotCall/doNotCall');
});

router.post('/', function(req, res, next) {
    unsubscribe.sendConfirmation(req.params, function() {
        res.redirect('/unsubscribe?confirm=true');
    })
});

router.get('/confirmation', function(req, res, next) {
    //if key is found in pending confirmation table
    unsubscribe.unsubscribe(req.query, function(data) {
        res.render('mulesoft/doNotCall/confirmed');
    })    
});

module.exports = router;
