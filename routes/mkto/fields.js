var express = require('express');
var router = express.Router();
var mktoFields = require('../../repositories/mkto/fields')();

router.get('/getFormFieldsByFormId/:id', function(req, res, next) {
    mktoFields.getFormFieldsByFormId(req.params['id'], function(data) {
        res.json(data);
    });
});

module.exports = router;
