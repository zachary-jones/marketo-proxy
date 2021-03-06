var express = require('express');
var router = express.Router();
var mktoCustomFields = require('../../repositories/mkto/customFields')();

/**
 * Returns all Custom Fields, nit currenly being used in mkto instances
 */
router.get('/getCustomFields/', function(req, res, next) {
    mktoCustomFields.getCustomFields(function(data) {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(data,null,4));
    });
});

module.exports = router;
