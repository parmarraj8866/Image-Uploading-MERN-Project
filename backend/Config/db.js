const mongoose = require("mongoose")
const dbConfig = () => {
    mongoose.connect("mongodb://localhost:27017/Image-Uploading")
        .then(() => { console.log("DB Connect...") })
        .catch((err) => { console.log("Error : ", err) })
}

module.exports = dbConfig