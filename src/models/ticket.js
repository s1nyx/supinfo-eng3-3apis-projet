const mongoose = require("mongoose")

const trainSchema = new mongoose.Schema({
    username: {type: String, required: true},
    start_station: {type: String, required: true},
    start_station_id: {type: String, required: true},
    end_station: {type: String, required: true},
    end_station_id: {type: String, required: true},
    valid: {type: Boolean, default: false}
})

module.exports = mongoose.model("Train", trainSchema, "trains")