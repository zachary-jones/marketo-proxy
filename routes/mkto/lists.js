var express = require('express');
var router = express.Router();
var mktoLists = require('../../repositories/mkto/lists')();

/**
 * Gets Static List meta data by name
 */
router.get('/getLists/', function (req, res, next) {
    mktoLists.getLists(function (data) {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(data, null, 4));
    });
});

/**
 * Associates leads [] with list
 * list types: name, id
 */
router.get('/associateLeadsToListBy/:type/:value/:leads', function (req, res, next) {
    mktoLists.associateLeadsToListBy(req.params['type'], req.params['value'], req.params['leads'], function (data) {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(data, null, 4));
    });
});

module.exports = router;