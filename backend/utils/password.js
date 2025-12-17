
const bcrypt = require("bcryptjs")

exports.plainToHash = async (password) => {
    const salt = bcrypt.genSaltSync(10);
    return await bcrypt.hash(password, salt)
}