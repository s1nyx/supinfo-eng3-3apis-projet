const mongoose = require("mongoose")

const stationSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    open_hour: {type: Date, required: true},
    close_hour: {type: Date, required: true},
    image: {type: String, required: true}
})

module.exports = mongoose.model("TrainStation", stationSchema, "stations")