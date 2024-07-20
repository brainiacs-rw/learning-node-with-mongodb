const mongoose = require("mongoose");

const studetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String
    }
});

module.exports.Student=mongoose.model('student', studetSchema);