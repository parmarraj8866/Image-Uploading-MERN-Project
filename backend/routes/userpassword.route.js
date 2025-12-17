const router = require('express').Router()
const userPassController = require('../controllers/userpassword.controller')

router.route("/signup").post(userPassController.signup)
router.route("/login").post(userPassController.login)

module.exports = router