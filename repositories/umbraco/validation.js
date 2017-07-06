var app = require('../../app');

function validateBody(body, callback) {
	var isValid = true;
	var errorMessage = "";
	for (var key in body) {
		if (body.hasOwnProperty(key)) {
			// Validate Post 
			var element = body[key];
			if (isEmail(key) && !validateEmail(element)) {
				errorMessage += "invalid email ";
				isValid = false;
			}
			if (isPhone(key) && !validatePhone(element)) {
				errorMessage += "invalid phone ";
				isValid = false;
			}
		}
	}
	if (isValid) {
        callback({ isValid: true, message: "" })
	} else {
		// If False Return with response object
		app.locals.mailer.sendEmail("Form reached server but failed validation", JSON.stringify({ form_body: body, errorMessage: errorMessage }, null, 2));
		callback({ isValid: false, message: errorMessage })
	}
}

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

var validation = { 
    validate: function(body, callback) {
        validateBody(body, callback);
    }
};

module.exports = function() {
    return validation;
}