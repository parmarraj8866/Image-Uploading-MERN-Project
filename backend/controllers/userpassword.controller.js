const { plainToHash } = require("../utils/password")
const UserPassword = require("../models/userPassword.model")

exports.signup = async (req, res) => {

    try {
        const { username, email, mobile, password } = req.body
        const hashPass = plainToHash(password)
        const userPassword = await UserPassword.create({ username, email, mobile, password: hashPass })
        res.json({
            success: true,
            message: "SignUp",
            userPassword
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}

exports.login = async ( req, res) => {
    console.log(req.body)
}