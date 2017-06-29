var express = require('express');
var router = express.Router();
var mktoFields = require('../../repositories/mkto/fields')();

/**
 * Returns all form fields on a form by Form ID
 */
router.get('/getFormFieldsByFormId/:id', function (req, res, next) {
    if (!req.params.id || req.params.id === ':id') {
        res.send('id required');
    } else {
        mktoFields.getFormFieldsByFormId(req.params['id'], function (data) {
            res.header("Content-Type", 'application/json');
            res.send(JSON.stringify(data, null, 4));
        });
    }
});

router.get('/getFormFields', function (req, res, next) {
    mktoFields.getFormFields(function (data) {
        res.header("Content-Type", 'application/json');
        res.send(JSON.stringify(data, null, 4));
    });
});

module.exports = router;