const g2_model = require("../models/g2_model");

const examiner_view = async (req, res) => {

    let type = [];
    let view_testtype = "" ;
    if (req.query.testType) {
        type.push(req.query.testType);
        view_testtype = req.query.testType;
    }
    else {
        type.length = 0;
        type = ["G", "G2"];
    }

    await g2_model.find({ usertype:"Driver", appointment_ID: { $exists: true }, TestType: { $in: type } }).populate("appointment_ID").then((data) => {

        res.render("examiner/index", { data: data , filter : view_testtype });
    })

}

const examiner_assess = async (req,res) => {

    let id = req.params.id;

    if(!id)
    {
        res.redirect("/examiner/");
    }



    await g2_model.findById(id).then((data) => {

        console.log(data);
        res.render("examiner/assess", { data: data });

    }).catch((e) => {

        return res.redirect("/examiner/");

    })


}

const examiner_assess_save = async (req,res) => {

    let body = req.body;

    if(body.id)
    {
        await g2_model.findByIdAndUpdate(body.id,{ result:body.result,comments:body.comments}).then((data) => {
            console.log(data);
        })
    }

    res.redirect("/examiner");


}


module.exports = {
    examiner_view,
    examiner_assess,
    examiner_assess_save
}