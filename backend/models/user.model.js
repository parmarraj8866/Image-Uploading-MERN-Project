const { Schema, model } = require("mongoose")
const common = require("./common.model")

const userSchema = new Schema({
    name: {
        ...common
    },
    email: {
        ...common
    },
    mobile: {
        ...common,
        type: Number
    },
    image: {
        type: [String],
        require: false
    }
}, {
    timestamps: true
})

module.exports = model("user", userSchema)

