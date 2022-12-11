// authentication middleware
const g2_model = require("../models/g2_model");

// user authentication security
const authenticated = (req, res, next) => {
  g2_model.findById(req.session.userId, (error, user) => {
    if (error || !user) 
    {
      return res.redirect("/");
    }

    next();
  });
};

// user authenticated restriction of login/register page or routes
const redirectIfAuth = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect("/");
  }
  next();
};

// user type page restriction middleware
const driverGate = (req, res, next) => {
  if (req.session.userType == "Driver") {
    next();
  }
  else
  {
    return res.redirect("/");
  }
};

const adminGate = (req, res, next) => {
  if (req.session.userType == "Admin") {
    next();
  }
  else
  {
    return res.redirect("/");
  }
};

const examinerGate = (req, res, next) => {
  if (req.session.userType == "Examiner") {
    next();
  }
  else
  {
    return res.redirect("/");
  }
};

module.exports = {
  authenticated,
  redirectIfAuth,
  driverGate,
  adminGate,
  examinerGate
};
