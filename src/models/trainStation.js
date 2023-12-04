const mongoose = require("mongoose")

exports.stationSchema = mongoose.Schema({
    name: {type: String, required: true},
    open_hour: {type: Date, required: true},
    close_hour: {type: Date, required: true},
    image: {type: String, required: true}
})
