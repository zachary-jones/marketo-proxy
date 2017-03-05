var express = require('express');
var router = express.Router();
var mktoForms = require('../../repositories/mkto/forms')();

//current limit is 200, TODO: use offset paramater to build paging...
router.get('/getAllForms/', function(req, res, next) {
    mktoForms.getAllForms(function(data) {
        res.header("Content-Type",'application/json');        
        res.send(JSON.stringify(data,null,4));
    });
});

router.get('/getFormByName/:name', function(req, res, next) {
    mktoForms.getFormByName(req.params['name'], function(data) {
        res.header("Content-Type",'application/json');        
        res.send(JSON.stringify(data,null,4));
    });
});

router.get('/getFormById/:Id', function(req, res, next) {
    mktoForms.getFormById(req.params['Id'], function(data) {
        res.header("Content-Type",'application/json');        
        res.send(JSON.stringify(data,null,4));
    });
});

module.exports = router;
