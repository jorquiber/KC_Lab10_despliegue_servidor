var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwtAuth = require('./lib/jwtAuthMiddleware');
const LoginController = require('./controllers/loginController');

const loginController = new LoginController();

require('./lib/connectMongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.locals.title = 'NodePop';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Rutas del api
app.post('/apiv1/authenticate', loginController.postAPIJWT);
app.use('/apiv1/anuncios', jwtAuth, require('./routes/api/anuncios'));

// Rutas del web
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/anuncios', require('./routes/anuncios'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {

  res.status(err.status || 500);

  // si el fallo es en el API, responder en formato JSON
  if (req.originalUrl.startsWith('/apiv1/')) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
