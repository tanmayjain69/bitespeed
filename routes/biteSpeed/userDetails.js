const express = require("express");

const router = express.Router();
const handlers = require("../../controllers/userDetails/handlers");
const { asyncWrapper } = require("../../utils/middleware");

router.post("/identify", asyncWrapper(handlers.identify));
module.exports = router;
