var express = require('express');
var router = express.Router();
var mktoForms = require('../../repositories/mkto/forms')();

//current limit is 200, TODO: use offset paramater to build paging...
router.get('/getAllForms/', function(req, res, next) {
    mktoForms.getAllForms(function(data) {
        res.json(data);
    });
});

router.get('/getFormByName/:name', function(req, res, next) {
    mktoForms.getFormByName(req.params['name'], function(data) {
        res.json(data);
    });
});

router.get('/getFormById/:Id', function(req, res, next) {
    mktoForms.getFormById(req.params['Id'], function(data) {
        res.json(data);
    });
});

module.exports = router;
