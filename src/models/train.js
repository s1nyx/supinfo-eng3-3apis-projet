const mongoose = require("mongoose")

exports.trainSchema = mongoose.Schema({
    name: {type: String, required: true},
    start_station: {type: String, required: true},
    end_station: {type: String, required: true},
    time_of_Departure: {type: Date, required: true}
})
