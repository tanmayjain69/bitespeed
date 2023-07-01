const express = require("express");

const router = express.Router();
const userDetailsHandler = require("./userDetails");

router.use("/biteSpeed", userDetailsHandler);
module.exports = router;
