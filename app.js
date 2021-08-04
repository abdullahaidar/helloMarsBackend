var createError = require("http-errors");
var express = require("express");

var { join, dirname } = require("path");
var { Low, JSONFile } = require("lowdb");
var { fileURLToPath } = require("url");

//Use JSON file for storage
const file = join(__dirname, "data/db.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const axios = require("axios");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var weatherRouter = require("./routes/weatherRoute");

var app = express();


db.read();
db.data = db.data || { weather: [] }




app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/weather", weatherRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
