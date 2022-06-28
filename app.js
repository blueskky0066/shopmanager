var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var addressRouter = require('./routes/address');

// 注册索引+1的helper
hbs.registerHelper("addOne", (index) => {
    //返回+1之后的结果
    return index + 1;
});


var mongoose = require("mongoose");
var url = "mongodb://127.0.0.1:27017/shop"; // 本地数据库地址
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    if (err)
        console.log("连接数据库失败" + err)
    else
        console.log("连接数据库成功")
})


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/address', addressRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'))
})
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'))
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'))
})

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });

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