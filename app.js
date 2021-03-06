//=============================================================================//
// Imports
//=============================================================================//

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var jenkinsRouter = require('./routes/jenkins');
var statusRouter = require('./routes/status');

var app = express();





const github = require('octonode');

localClient = {
    username: 'huthanh89',
    password: 'Huynht123*'
}

ciscoClient = {
    username: 'thanhuyn',
    password: 'Xoujas123!@#'
}

var client = github.client(ciscoClient);

ghme = client.me()


ghme.info(function(){
    console.log(arguments)
});

//=============================================================================//
// Configuration
//=============================================================================//

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
    extended: true
}));

//=============================================================================//
// Route Handler
//=============================================================================//

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jenkins', jenkinsRouter);
app.use('/status', statusRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

    console.log(err)

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//=============================================================================//
// Export
//=============================================================================//

module.exports = app;

//=============================================================================//