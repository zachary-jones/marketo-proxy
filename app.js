var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = module.exports = express();

// environment settings
if (process.env.mode === undefined) process.env.mode = 'local';
app.locals.IsProduction = function () { return process.env.mode === 'production'; };

// simple global to form a single point of truth on various views needing this data exposed as a variable
app.locals.config = { marketo: require('./config/marketo')(app.locals.IsProduction()).default };

// globla e-mailer
app.locals.mailer = {
    sendEmail: function (subject, content, toAddress, ccAddress) {
        try {
            require('./repositories/helpers/mailer').sendMessage(subject, content, toAddress, ccAddress);
        } catch (error) {
            console.error(error);
        }
    }
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// body and cookie parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require('cookie-parser')());

// compression and minification
if (app.locals.IsProduction()) {
    app.use(require('compression')());
    app.use(require('express-minify')());
}

// static assets
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes
app.use('/mkto/leads/', require('./routes/mkto/leads'));
app.use('/mkto/forms/', require('./routes/mkto/forms'));
app.use('/mkto/fields/', require('./routes/mkto/fields'));
app.use('/mkto/lists/', require('./routes/mkto/lists'));
app.use('/mkto/customFields/', require('./routes/mkto/customFields'));
app.use('/mkto/tests/', require('./routes/mkto/tests/tests'));
app.use('/instapage/tests/', require('./routes/instapage/tests/tests'));
app.use('/instapage/instapage/', require('./routes/instapage/instapage'));
app.use('/mulesoft/tests/', require('./routes/mulesoft/tests/tests'));
app.use('/mulesoft/boas/', require('./routes/mulesoft/boas'));
app.use('/mulesoft/salesforce/', require('./routes/mulesoft/salesforce'));
app.use('/mulesoft/enrollment/', require('./routes/mulesoft/enrollment'));
app.use('/umbraco/umbraco/', require('./routes/umbraco/umbraco'));
app.use('/umbraco/tests/', require('./routes/umbraco/tests/tests'));
app.use('/features/', require('./routes/features/features'));
app.use('/features/tests/', require('./routes/features/tests/tests'));
app.set("api", require('express-list-endpoints')(app));
app.use('/', require('./routes/index'));

// external npm debugger (EDM on views)
if (!app.locals.IsProduction()) {
    require('express-debug')(app);
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in non-production
    res.locals.message = err.message;
    res.locals.error = !app.locals.IsProduction() ? err : {};

    app.locals.mailer.sendEmail("An application level error has occured in the Bisk-Proxy", err);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;