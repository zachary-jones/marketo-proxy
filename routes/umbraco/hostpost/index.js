var express = require('express');
var router = express.Router();
var mktoLeads = require('../../../repositories/mkto/leads')();
var mktoLists = require('../../../repositories/mkto/lists')();
var validation = require('../../../repositories/umbraco/validation')();

router.post('/marketopost', function (req, res, next) {
	validation.validate(req.body, function(isValidObject) {
		//TODO: maybe log request or soemthing
		if (!isValidObject.isValid) {
			res.status(400).send(isValidObject);
		} else {
			res.send(isValidObject);
		}
	});
});

module.exports = router;