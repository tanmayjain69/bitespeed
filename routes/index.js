const express = require("express");

const router = express.Router();
const biteSpeed = require("./biteSpeed");

router.use("/", biteSpeed);

module.exports = router;
