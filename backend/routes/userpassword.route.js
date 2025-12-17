const router = require('express').Router()
const userPassController = require('../controllers/userpassword.controller')

router.route("/").post(userPassController.store)

module.exports = router