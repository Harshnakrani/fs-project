// G controller
const g2_model = require("../models/g2_model");
const bcrypt = require("bcrypt");
const appointment_model = require("../models/appointment");

// g page View method
const g_test_get = async (req, res) => {
  await g2_model.findById(req.session.userId).populate("appointment_ID").then((data) => {
    if (data.licenseNo == "") {
      return res.redirect("/g2_test");
    }

    res.render("g_test", {
      g2_data: data, date: "", slots: "", errors: req.flash("error"),
      success: req.flash("success")
    });
  });
};

// g2 page data view method
const g2_test_view = async (req, res) => {
  var id = req.session.userId;

  await g2_model.findById(id).populate("appointment_ID").then((data) => {
    console.log(data);
    res.render("g2_test", {
      g2_data: data, date: "", slots: "", errors: req.flash("error"),
      success: req.flash("success")
    });
  });
};

// g2 page data updation post method
const g2_test_update = async (req, res) => {
  var id = req.session.userId;

  g2_model.findById(id, (error, user) => {
    // license no validation and length validation

    if (user.licenseNo == "" && req.body.licenseNo.length == 8) {
      // license encryption
      req.body.licenseNo = bcrypt.hashSync(req.body.licenseNo, 10);

      g2_model.findByIdAndUpdate(id, req.body, (error, data) => {
        return res.redirect("/g_test");
      });
    } else {
      delete req.body.licenseNo;
      g2_model.findByIdAndUpdate(id, req.body, (error, data) => {
        return res.redirect("/g_test");
      });
    }
  });
};


const check_appointment = async (req, res) => {

  console.log(req.baseUrl);

  let base_view = "g2_test";
  if (req.baseUrl == "/g2_test") {
    base_view = "g2_test";
  }
  else if (req.baseUrl == "/g_test") {
    base_view = "g_test";
  }

  let date = "";
  let slots = [];
  if (req.query.date) {
    date = req.query.date;

    await appointment_model.find({ date: date, isTimeSlotAvailable: true }).then((res) => {

      if (res) {
        slots = res;
      }

    });

  }

  var id = req.session.userId;
  await g2_model.findById(id).populate("appointment_ID").then((data) => {
    res.render(base_view, {
      g2_data: data, date: date, slots: slots, errors: req.flash("error"),
      success: req.flash("success")
    });
  });

}

const save_appointment = async (req, res) => {

  let TestType = "";
  if (req.baseUrl == "/g2_test") {
    TestType = "G2";
  }
  else if (req.baseUrl == "/g_test") {
    TestType = "G";
  }


  await g2_model.findByIdAndUpdate(req.session.userId, { appointment_ID: req.body.time, TestType: TestType }).then(async (result) => {
    console.log(result);
    if (result) {

      await appointment_model.findByIdAndUpdate(req.body.time, { isTimeSlotAvailable: false }).then((ack) => {
        console.log(ack);
        if (ack) {
          req.flash("success", "Appointment booked successully.");
          return res.redirect(req.baseUrl);
        }
      })


    }
  }).catch((e) => {

    req.flash("error", e);
    res.redirect(req.baseUrl);
  });

}

module.exports = {
  g_test_get,
  g2_test_view,
  g2_test_update,
  check_appointment,
  save_appointment
};
