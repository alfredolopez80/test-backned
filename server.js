require('express-async-errors');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var api = require('./api/routes');
var favicon = require('serve-favicon');
var path = require('path')
var app = express();
const dotenv = require('dotenv');
dotenv.config();



app.use(logger(app.get("env") === "production" ? "combined" : "dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(favicon(__dirname + '/images/favicon.ico'));

app.use('/', api);

app.set("env", process.env.NODE_ENV || "development");
app.set("host", process.env.HOST || "localhost");
app.set("port", process.env.PORT || 8000);

console.log('Host Port '+process.env.PORT)

app.listen(app.get("port"), function () {
    console.log('Listen to '+ app.get("host") +' ' + app.get("port"));
});


app.use(function(req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status( err.code || 500 )
        .json({
            status: 'error',
            message: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    .json({
        status: 'error',
        message: err.message
    });
});


module.exports = app;
