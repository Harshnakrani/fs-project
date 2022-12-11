//  intial constat declaration
const express = require("express");
const path = require("path");
const app = new express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const g2_model = require("./models/g2_model");
const session = require("express-session");
const uniqueValidator = require('mongoose-unique-validator');
var flash = require('connect-flash');

//routers
const indexRoutes = require("./routes/indexRoutes");
const gRoutes = require("./routes/gRoutes");
const g2Routes = require("./routes/g2Routes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const examinerRoutes = require("./routes/examinerRoutes");

//create connection

mongoose.connect(
  "mongodb+srv://admin:admin@cluster0.mlsadsa.mongodb.net/DriveTest?retryWrites=true&w=majority"
);

// templet engin and public folder path setup
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.use(flash());

// global variable declaration
global.loggedIn = null;
global.userType = null;

// session secret
app.use(
  session({
    secret: "ASD ULTRA",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

// setting global variable value on every reqest on server
app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  userType = req.session.userType;
  // console.log({ loggedIn,userType });
  next();
});

// routes declaration
app.use("/", indexRoutes);
app.use("/g_test", gRoutes);
app.use("/g2_test", g2Routes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/examiner", examinerRoutes);

// run app on port 4000
app.listen(4000, () => {
  console.log("App listening on port 4000");
});
