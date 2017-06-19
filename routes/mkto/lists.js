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
    if ((!req.params.listId || req.params.listId === ':listId') || (!req.params.leads || req.params.leads === ':leads')) { res.send('listId, leads required'); } else {
        mktoLists.associateLeadsToList(req.params.listId, req.params.leads, function (data) {
            res.header("Content-Type", 'application/json');
            res.send(JSON.stringify(data, null, 4));
        });
    }
});

/**
 * Get leads associated with list
 */
router.get('/getLeadsOnListByListId/:listId', function (req, res, next) {
    if ((!req.params.listId || req.params.listId === ':listId')) { res.send('listId, leads required'); } else {
        mktoLists.getLeadsOnList_ByListId(req.params.listId, function (data) {
            res.header("Content-Type", 'application/json');
            res.send(JSON.stringify(data, null, 4));
        });
    }
});

module.exports = router;