const mongoose = require("mongoose")

exports.trainSchema = mongoose.Schema({
    name: {type: String, required: 1},
    start_station: {type: String, required: 1},
    end_station: {type: String, required: 1},
    time_of_Departure: {type: Date, required: 1}
})
