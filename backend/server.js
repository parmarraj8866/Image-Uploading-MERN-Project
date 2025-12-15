const express = require('express');
const app = express();
const cors = require('cors');
const fs = require("fs");
const path = require("path");

require("./Config/db")();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static('uploads'));

const route = require("./routes/user.route");
app.use("/api/user", route);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
