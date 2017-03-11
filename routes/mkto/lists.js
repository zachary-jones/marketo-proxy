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
 */
router.get('/associateLeadsToList/:listId/:leads', function (req, res, next) {
    mktoLists.associateLeadsToList(req.params['listId'], req.params['leads'], function (data) {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(data, null, 4));
    });
});

module.exports = router;