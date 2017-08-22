var express = require('express');
var router = express.Router();

router.get('/liveagent', function (req, res, next) {
	res.render('salesforce/liveagent');
});

router.get('/liveagentVU', function (req, res, next) {
	res.render('salesforce/liveagentvu');
});

module.exports = router;