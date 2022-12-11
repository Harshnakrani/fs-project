// create a schema

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");

const g2 = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    enum: ["Driver", "Examiner", "Admin"],
    default: "Driver",
  },
  firstName: {
    type: String,
    default: "fname",
  },
  lastName: {
    type: String,
    default: "lname",
  },
  licenseNo: {
    type: String,
    default: "",
  },
  age: {
    type: Number,
    default: 22,
  },
  appointment_ID: {
    type: Schema.Types.ObjectId,
    ref: "appointment"
  },
  TestType:
  {
    type:String,
    default:"",
  },
  result:
  {
    type:Boolean
  },
  comments:
  {
    type:String
  },
  car_details: {
    make: {
      type: String,
      default: "Tesla",
    },
    model: {
      type: String,
      default: "Model-Y",
    },
    year: {
      type: String,
      default: "2020",
    },
    plateNo: {
      type: String,
      default: "LOLGAS",
    },
  },
});
g2.plugin(uniqueValidator, { message: '{PATH} is already in use, please try diffrent username' })

const DriveTest = mongoose.model("g2", g2);
module.exports = DriveTest;
