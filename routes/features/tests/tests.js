var express = require('express');
var router = express.Router();
var mktoMigration = require('../../../repositories/features/mktoMigration')();
var defaultCampaigns = require('../../../config/campaigns');

router.get('/defaultCampaign', function(req, res, next) {
    res.render('features/tests/defaultCampaign');
})

module.exports = router;