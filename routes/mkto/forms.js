var express = require('express');
var router = express.Router();
var mktoForms = require('../../repositories/mkto/forms')();

//current limit is 200, TODO: use offset paramater to build paging...
/**
 * Returns all forms meta data from mkto instance
 */
router.get('/getAllForms/', function(req, res, next) {
    mktoForms.getAllForms(function(data) {
        res.header("Content-Type",'application/json');        
        res.send(JSON.stringify(data,null,4));
    });
});

/**
 * Returns form meta data by Form Name
 */
router.get('/getFormByName/:name', function(req, res, next) {
    if (!req.params['name'] || req.params['name'] === ':name') { res.send('name required'); } else {
        mktoForms.getFormByName(req.params['name'], function(data) {
            res.header("Content-Type",'application/json');        
            res.send(JSON.stringify(data,null,4));
        });
    }
});

/**
 * Returns form meta data by Form ID
 */
router.get('/getFormById/:Id', function(req, res, next) {
    if (!req.params['Id'] || req.params['Id'] === ':Id') { res.send('Id required'); } else {
        mktoForms.getFormById(req.params['Id'], function(data) {
            res.header("Content-Type",'application/json');        
            res.send(JSON.stringify(data,null,4));
        });
    }
});

module.exports = router;
