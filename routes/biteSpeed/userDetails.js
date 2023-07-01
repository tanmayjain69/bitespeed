const express = require("express");

const router = express.Router();
const handlers = require("../../controllers/userDetails/handlers");
const { asyncWrapper } = require("../../utils/middleware");

router.get("/identify", asyncWrapper(handlers.identify));
router.get("/set", asyncWrapper(handlers.getTabData));
module.exports = router;
