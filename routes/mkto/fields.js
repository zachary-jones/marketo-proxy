var express = require('express');
var router = express.Router();
var mktoFields = require('../../repositories/mkto/fields')();

router.get('/getFormFieldsByFormId/:id', function(req, res, next) {
    mktoFields.getFormFieldsByFormId(req.params['id'], function(data) {
        res.header("Content-Type",'application/json');
        res.send(JSON.stringify(data,null,4));
    });
});

module.exports = router;