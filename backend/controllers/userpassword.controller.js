const { plainToHash, hashToPlain } = require("../utils/password")
const UserPassword = require("../models/userPassword.model")

exports.signup = async (req, res) => {

    try {
        const { username, email, mobile, password } = req.body
        const hashPass = await plainToHash(password)
        const userPassword = await UserPassword.create({ username, email, mobile, password: hashPass })
        res.cookie("name", "Parmar Raj", {
            httpOnly : true,
            secure : true
        }).json({
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

exports.login = async (req, res) => {
    const { email, password } = req.body
    const ExistUser = await UserPassword.findOne({
        email
    })

    if (!ExistUser) {
        return res.json({
            success: false,
            message: "Email Id Not Exist!"
        })
    }

    const hashPass = ExistUser.password
    const matchPass = await hashToPlain(password, hashPass)

    if (!matchPass) {
        return res.json({
            success: false,
            message: "Password Not Match!"
        })
    }

    res.json({
        success: true,
        message: "User SuccessFully Login!"
    })

}