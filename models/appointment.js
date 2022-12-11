const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const appointment = new Schema({
    date: {
        type: String,
        required: [true, "{PATH} is required field."]


    },
    time: {
        type: String,
        required: [true, "{PATH} is required field."]
    },
    isTimeSlotAvailable:{
        type:Boolean,
        default:true
    }
});


const appointment_model = mongoose.model('appointment', appointment);
module.exports = appointment_model;