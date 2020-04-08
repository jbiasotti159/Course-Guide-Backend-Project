/*
  Jillian Biasotti, Aden Mariyappa, Joe ruiz
  4.7.20
*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var courseSchema = require("mongoose").model("course").schema;

var usersSchema = new Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    pass: {
      type: String,
      required: true,
    },
    isAdvisor: {
      type: Boolean,
      required: true,
      default: true,
    },
    advisees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    schedule: {
      type: [courseSchema],
      required: false,
    },
  },
  { timestamps: true }
);

var users = mongoose.model("User", usersSchema);

module.exports = users;
