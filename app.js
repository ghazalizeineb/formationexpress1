var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const { connectToMongoDB } = require('./db/BD');
const session=require('express-session');
const detailedLogger=require('./middlewares/logs');

var commandeRouter=require('./routes/commandeRouter'); 
var osRouter= require('./routes/os');
var userRouter=require('./routes/userRouter');
var menuRouter=require('./routes/menuRouter');
var platRouter=require('./routes/platRouter');
var avisRouter=require('./routes/avisRouter');
var paiementRouter=require('./routes/paiementRouter');

var app = express();

require("dotenv").config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(detailedLogger);

app.use(session({
  secret:process.env.net_secret,
  resave:false,
  saveUninitialized:true,
  cookie:{secret:false,maxAge:2*60*60}

}))

app.use('/os', osRouter);
app.use('/user',userRouter);
app.use('/menu',menuRouter);
app.use('/commande',commandeRouter);
app.use('/plat',platRouter);
app.use('/avis',avisRouter);
app.use('/paiement',paiementRouter);



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
  res.json('error');
});

const server = http.createServer(app);
server.listen(process.env.PORT, () => {connectToMongoDB(),console.log("app is running on port 5000 ,")})

module.exports = app;
