const g2_model = require("../models/g2_model");
const appointment_model = require("../models/appointment");

const bcrypt = require("bcrypt");

// user login View Method
const appointment_view = async (req, res) => {
  let date = "";
  let time_occupied = [];
  if (req.query.date) {
    date = req.query.date;

    await appointment_model.find({ date: date }).then((res) => {
      // console.log(res);
      res.forEach(single => {
        time_occupied.push(single.time);
      });

    });

  }

  res.render("admin/appointment", {
    date: date,
    time_occupied: time_occupied,
    errors: req.flash("error"),
    success: req.flash("success"),
  });
};

const appointment_post = async (req, res) => {
  console.log(req.body);

  let date = req.body.date;
  let time = req.body.time;


  let data = [];
  if (req.body.time != null) {
    time.forEach(element => {

      data.push({ "date": date, "time": element });

    });
  }
  else {

    data.push({ "date": date, "time": "" });
  }


  await appointment_model.insertMany(data).then((result) => {
    if (result.length > 0) {
      req.flash("success", "Appointment added successully.");
    }
    res.redirect("/admin/appointment");
  }).catch((error) => {
    if (error) {
      const error_data = Object.keys(error.errors).map(key => error.errors[key].message)
      req.flash("error", error_data);

      if (data[0].date) {
        return res.redirect("/admin/appointment?date=" + encodeURIComponent(data[0].date));
      }
      else {
        return res.redirect("/admin/appointment");
      }

    }
  })


}

const test_results = async (req, res) => {

  const pass_result = g2_model.find({ result: true });
  const fail_result = g2_model.find({ result: false });


  let [pass, fail] = await Promise.all([pass_result, fail_result]);


  res.render("admin/result", { pass: pass, fail: fail });


}



module.exports = {
  appointment_view,
  appointment_post,
  test_results
};
