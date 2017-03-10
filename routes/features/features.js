var express = require('express');
var router = express.Router();
var mktoMigration = require('../../repositories/features/mktoMigration')();
var defaultCampaigns = require('../../config/campaigns');

// router.get('/programBuilder/', function(req, res, next) {
//     res.render('features/ProgramBuilder');
// });

// router.get('/API/programBuilder/:id', function(req, res, next) {
//     res.render('features/ProgramBuilder');
// });

// function transformFormsObj(forms) {
//     console.dir(forms);

//     return forms;
// }

//WIP: it seems I am unable to make requests using different auth keys on the same instance...
//users are not unique between marketo instances... 
// router.get('/MarketoMigration/', function(req, res, next) {
//     mktoMigration.getAllForms(function(data) {
//         data = transformFormsObj(data);
//         res.render('features/MarketoMigration', { data: data });
//     });
// });

router.get('/defaultCampaigns', function(req, res, next) {
    res.json(defaultCampaigns);
})

router.get('/defaultCampaign', function(req, res, next) {
    var host = req.hostname.replace('explore.','');
    var x = ''
    defaultCampaigns.default.forEach(function(val, ind, arr) {
        if (val[0].indexOf(host) > -1) x = val[1];
        return;
    })
    res.json(x);
})

module.exports = router;
