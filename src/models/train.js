const mongoose = require("mongoose")

const trainSchema = mongoose.Schema({
    name: {type: String, required: true},
    start_station: {type: String, required: true},
    end_station: {type: String, required: true},
    time_of_Departure: {type: Date, required: true}
})

module.exports = mongoose.model("Train", trainSchema, "trains")