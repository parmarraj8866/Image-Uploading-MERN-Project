const router = require('express').Router()
const controller = require('../controllers/user.controller')
const upload = require("../utils/upload")


// router.route("/").post(upload.single("image"), controller.createUser)
router.route("/").post(upload.array("image", 3), controller.createUser)
    .get(controller.getUsers)
    .put(upload.array("image", 3), controller.updateUser)

router.route("/:id").delete(controller.trashUser)

module.exports = router