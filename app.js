var createError = require("http-errors");
var express = require("express");

var { join, dirname } = require("path");
var { Low, JSONFile } = require("lowdb");
var { fileURLToPath } = require("url");

// Use JSON file for storage
const file = join(__dirname, "data/dummy.json");
const adapter = new JSONFile(file);
const db = new Low(adapter);

var cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const axios = require("axios");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

db.read();

// If file.json doesn't exist, db.data will be null
// Set default data
// db.data ||= { posts: [] };
db.data = db.data || { posts: [] }; // for node < v15.x

// Create and query items using plain JS
db.data.posts.push("hello world");
db.data.posts[0];

// You can also use this syntax if you prefer
const { posts } = db.data;
posts.push("hello world");

// Write db.data content to db.json
db.write();

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
