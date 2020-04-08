/*
  Jillian Biasotti,Aden Mariyappa, Joe Ruiz
  3.22.20
*/
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var courses = require("./models/courses");
var users = require("./models/users");
var usersRouter = require("./routes/users");
var coursesRouter = require("./routes/courses");
/**
 * Create a connection to mongoDB using mongoose
 */
var mongoose = require("mongoose");
var assert = require("assert");
// Connection URL
var url =
  "mongodb+srv://jnbiasotti:pass123@cluster0-akse8.mongodb.net/CourseGuide?retryWrites=true&w=majority";

// Connect using mongoose
mongoose.connect(url, { useNewUrlParser: true });
//open a connection and get a db handler
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Connected to MongoDB");
  /* const student = new users({
    fName: "John",
    lName: "Smith",
    username: "jsmith",
    pass: 123,
    isAdvisor: false,
    schedule: [
      {
        courseID: "ENR 210",
        date: "T/Th",
        credits: 3,
      },
      {
        courseID: "SER 210",
        date: "M/W/F",
        credits: 3,
      },
      {
        courseID: "MA 330",
        date: "T/Th",
        credits: 3,
      },
      {
        courseID: "CSC 330",
        date: "T/Th",
        credits: 3,
      },
      {
        courseID: "BIO 101",
        date: "M/W/F",
        credits: 3,
      },
    ],
  });
  student.save(function (err) {
    if (err) throw err;
  });
  
  const advisor = new users({
    fName: "Jack",

    lName: "Doe",

    advisees: [student._id], // add the _id for the studnet
    username: "jsmith",
    pass: 123,
    isAdvisor: false,
  });
  advisor.save(function (error) {
    if (!error) {
      users
        .find({})
        .populate("advisees")
        .exec(function (error, posts) {
          console.log(JSON.stringify(posts, null, "\t"));
        });
    }
  }); */
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/courses", coursesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
  //if error is not 404, sends the object to the next error
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
