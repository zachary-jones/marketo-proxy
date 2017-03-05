var express = require('express');
var router = express.Router();
var mktoMigration = require('../../repositories/features/mktoMigration')();

// router.get('/programBuilder/', function(req, res, next) {
//     res.render('features/ProgramBuilder');
// });

// router.get('/API/programBuilder/:id', function(req, res, next) {
//     res.render('features/ProgramBuilder');
// });

function transformFormsObj(forms) {
    console.dir(forms);

    return forms;
}

//WIP: it seems I am unable to make requests using different auth keys on the same instance...
//users are not unique between marketo instances... 
// router.get('/MarketoMigration/', function(req, res, next) {
//     mktoMigration.getAllForms(function(data) {
//         data = transformFormsObj(data);
//         res.render('features/MarketoMigration', { data: data });
//     });
// });

module.exports = router;
