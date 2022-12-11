const g2_model = require("../models/g2_model");

const bcrypt = require("bcrypt");

// user login View Method
const login_view = (req, res) => {
  res.render("login",{errors:req.flash("validationErros")});
};

// user registeration post Method
const register = async (req, res) => {
  // console.log(req.body);

  if (req.body.password == req.body.password_confirm) {
    let user = {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      usertype: req.body.usertype,
    };

    await g2_model.create(user, (error, data) => {
      if (error) {
        // console.log(data);
        const erroras = Object.keys(error.errors).map(key => error.errors[key].message)
        req.flash("validationErros",erroras);
        return res.redirect("/auth");
      }
      res.redirect("/");
    });
  } else {
    res.redirect("/auth");
  }
};

// user login post method
const login = (req, res) => {
  // console.log(req.body);
  const { username, password } = req.body;
  g2_model.findOne({ username: username }, (error, user) => {
    // console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          req.session.userId = user._id;
          req.session.userType = user.usertype;
          // console.log(user);
          // console.log(req.session.userType);
          res.redirect("/");
        } else {
          res.redirect("/auth");
        }
      });
    } else {
      res.redirect("/auth");
    }
  });
};

// user logout get method
const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

module.exports = {
  login_view,
  register,
  login,
  logout,
};
