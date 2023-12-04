const mongoose = require("mongoose")

exports.stationSchema = mongoose.Schema({
    name: {type: String, required: 1},
    open_hour: {type: Date, required: 1},
    close_hour: {type: Date, required: 1},
    image: {type: String, required: 1}
})
