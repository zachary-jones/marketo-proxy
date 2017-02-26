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
var listEndpoints = require('express-list-endpoints')
//config modules
var config = require('./config/config')();
var mktoConfig = require('./config/mkto')();
//route modules
var index = require('./routes/index');
var mktoLeads = require('./routes/mkto/leads');
var mktoTests = require('./routes/mkto/tests/tests');
var instapageTests = require('./routes/instapage/tests/tests');
var mulesoftTests = require('./routes/mulesoft/tests/tests');

var app = express(); 
    app.locals.config = config;
    app.locals.mktoConfig = mktoConfig;

console.log('*****\nExpress server listening on port ' + app.locals.config.port + ', mode: ' + app.locals.config.mode + '\nMarketo Munchkin Id: ' + app.locals.mktoConfig.munchkin_id);
fs.exists('access.log', function(exists) {
  if (exists) {
    fs.writeFile("access.log", "", function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("*****\nLog cleared\n\n");
    }); 
  }
})

//server logs
if (app.locals.config.mode !== 'production') {
  // create a write stream (in append mode)
  var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
  // setup the logger
  app.use(logger('combined', {stream: accessLogStream}));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/mkto/leads/', mktoLeads);
app.use('/mkto/tests/', mktoTests);
app.use('/instapage/tests/', instapageTests);
app.use('/mulesoft/tests/', mulesoftTests);

app.set("api", listEndpoints(app))
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;