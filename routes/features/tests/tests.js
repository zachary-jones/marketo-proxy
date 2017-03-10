var express = require('express');
var router = express.Router();
var defaultCampaigns = require('../../../config/campaigns');

router.get('/defaultCampaign', function(req, res, next) {
    res.render('features/tests/defaultCampaign');
})

module.exports = router;