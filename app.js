var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('colors');
const MicroMQ = require('micromq');
const pug_render = require('micromq-pug-render');

require('dotenv')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


console.log(`                               `.bgBlack.green)
console.log(`         EXPRESS START         `.bgBlack.green)
console.log(`                               `.bgBlack.green)

//
// создаем экземпляр класса MicroService
const mq = new MicroMQ({
  // название микросервиса (оно должно быть таким же, как указано в Gateway)
  name: 'users',
  // настройки rabbitmq
  rabbit: {
    // ссылка для подключения к rabbitmq (default: amqp://guest:guest@localhost:5672)
    url: process.env.RABBIT_URL,
  },
});


const path_views = __dirname + '/views/';
mq.use(pug_render({ path_views: path_views }));


// создаем эндпоинт /friends для метода GET
mq.all('/service1', (req, res) => {
  // отправляем json ответ
  res.render('index', {title: 'Service1'});
});

// создаем эндпоинт /status для метода GET
mq.all('/status1', (req, res) => {
  // отправляем json ответ
  res.json({
    text: '✅ service 1 - work!',
  });
});


mq.start();

/////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
