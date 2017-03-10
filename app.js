//npm libraries
var fs = require('fs');
var path = require('path');
//express npm libraries
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//external npm libraries
var listEndpoints = require('express-list-endpoints');
var compression = require('compression');
var minify = require('express-minify');
//config modules
var config = require('./config/config')();
var mktoConfig = require('./config/mkto')().default;
//route modules
var index = require('./routes/index');
var mktoLeads = require('./routes/mkto/leads');
var mktoForms = require('./routes/mkto/forms');
var mktoFields = require('./routes/mkto/fields');
var mktoCustomFields = require('./routes/mkto/customFields');
var mktoTests = require('./routes/mkto/tests/tests');
var instapageTests = require('./routes/instapage/tests/tests');
var instapage = require('./routes/instapage/instapage');
var mulesoftTests = require('./routes/mulesoft/tests/tests');
var mulesoftBoas = require('./routes/mulesoft/boas');
var mulesoftSalesforce = require('./routes/mulesoft/salesforce');
var umbraco = require('./routes/umbraco/umbraco');
var umbracoTests = require('./routes/umbraco/tests/tests');
var features = require('./routes/features/features');
var featuresTests = require('./routes/features/tests/tests');

var app = express();
app.locals.config = config;
app.locals.mktoConfig = mktoConfig;

if (!app.locals.config.mode === 'local') {
    fs.exists('access.log', function (exists) {
        if (exists) {
            fs.writeFile("access.log", "", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
}

//server logs
if (app.locals.config.mode !== 'production') {
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
        flags: 'a'
    });
    app.use(logger('combined', {
        stream: accessLogStream
    }));
}

if (process.env.mode === undefined) process.env.mode = 'local'

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
if (app.locals.config.mode !== 'local' || app.locals.config.mode === undefined) {
    app.use(compression());
    app.use(minify());
}
app.use(express.static(path.join(__dirname, 'public')));

//CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Routes
app.use('/mkto/leads/', mktoLeads);
app.use('/mkto/forms/', mktoForms);
app.use('/mkto/fields/', mktoFields);
app.use('/mkto/customFields/', mktoCustomFields);
app.use('/mkto/tests/', mktoTests);
app.use('/instapage/tests/', instapageTests);
app.use('/instapage/instapage/', instapage);
app.use('/mulesoft/tests/', mulesoftTests);
app.use('/mulesoft/boas/', mulesoftBoas);
app.use('/mulesoft/salesforce/', mulesoftSalesforce);
app.use('/umbraco/umbraco/', umbraco);
app.use('/umbraco/tests/', umbracoTests);
app.use('/features/', features);
app.use('/features/tests/', featuresTests);

app.set("api", listEndpoints(app))
app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;