var express = require('express');
var router = express.Router();
var mktoLeads = require('../../../repositories/mkto/leads')();
var mktoLists = require('../../../repositories/mkto/lists')();

router.post('/marketopost', function (req, res, next) {
	var isValid = true;
	var errorMessage = "";
	for (var key in req.body) {
		if (req.body.hasOwnProperty(key)) {
			// Validate Post 
			var element = req.body[key];
			if (isEmail(key) && !validateEmail(element)) {
				errorMessage += "invalid email ";
				isValid = false;
				break;
			}
			if (isPhone(key) && !validatePhone(element)) {
				errorMessage += "invalid phone ";
				isValid = false;
				break;
			}
		}
	}
	if (isValid) {
		// If True Send to Marketo 
		mktoLeads.upsertLead_AndAssociateWithList(req.body, mktoLists, function () {
			res.sendStatus(200);
		});
	} else {
		// If False Return with response object
		res.send(errorMessage);
	}
});


function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function validatePhone(phone) {
	var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
	return re.test(phone);
}

function isPhone(element) {
	return element.toLowerCase() == "phone";
}

function isEmail(element) {
	return element.toLowerCase() == "email";
}

module.exports = router;