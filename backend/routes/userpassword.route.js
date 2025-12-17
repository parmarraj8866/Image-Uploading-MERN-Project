const router = require('express').Router()
const userPassController = require('../controllers/userpassword.controller')

router.route("/").post(userPassController.signup)
router.route("/").post(userPassController.login)

module.exports = router