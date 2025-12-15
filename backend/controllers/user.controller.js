const User = require('../models/user.model')
const path = require('path')
const fs = require('fs')
const { IncomingMessage } = require('http')


exports.createUser = async (req, res) => {
    // Single Image : 

    // const { name, email, mobile } = req.body
    // const image = req?.file?.filename
    // const user = await User.create({ ...{ name, email, mobile }, image })
    // res.send(user)

    // Multiple Images : 
    const { name, email, mobile } = req.body
    const images = req.files.map((ele) => ele.filename)
    const user = await User.create({ ...{ name, email, mobile }, image: images })
    res.send(user)
}

exports.getUsers = async (req, res) => {
    const users = await User.find()
    if (users.length > 0) {
        res.json({
            Success: true,
            users
        })
    }
}

exports.trashUser = async (req, res) => {
    const { id } = req.params
    const matchUser = await User.findById(id)
    if (matchUser) {  
        matchUser.image.forEach((ele) => {
            let imagePath = path.join(__dirname, '../uploads', ele)
            fs.unlink(imagePath, async (err) => {
                if (err) {
                    res.json({
                        Success: false,
                        message: "File Path Not Found"
                    })
                } else {
                    await User.findByIdAndDelete(id)
                    res.json({
                        Success: true,
                        message: "User Has Been Deleted"
                    })
                }
            })
        })
    } else {
        res.json({
            Success: false,
            message: "User Not Found"
        })
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.query
    const { name, mobile, email } = req.body
    const images = req.files.map((ele) => ele.filename)
    await User.findByIdAndUpdate(id, { name, mobile, email, ...{ image: images } })
    res.json({
        Success: true,
        message: "User Updated!"
    })
}