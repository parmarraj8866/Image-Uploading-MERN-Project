const mongoose = require("mongoose")
const common = require("./common.model")


const userPassword = new mongoose.Schema({
    username: common,
    email: {
        ...common,
        unique: [true, "Email ID Already Exist!"]
    },
    mobile: {
        ...common,
        unique: [true, "Mobile Number Already Exist!"]
    },
    password: common
}, {
    timestamps: true
})

exports.module = mongoose.model("userPassword", userPassword)