var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var taskRouter = require('./routes/taskRouter');
var cors = require('cors');
const MongoDbStore = require('connect-mongo');
const dotenv = require('dotenv');

var app = express();
dotenv.config({ path: './.env' });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoDbStore.create({
          mongoUrl: process.env.DB_STRING
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24
      }
  })
);
app.use(cors({
  'origin':[process.env.CORS_ORIGIN_URL],
  'credentials':true
}))
app.use('/',taskRouter);

app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;