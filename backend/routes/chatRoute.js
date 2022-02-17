const express = require("express");
const {
    textQuery,
    eventQuery,
} = require("../controllers/chatController");

const router = express.Router();

router.route("/textQuery").post(textQuery);

router.route("/eventQuery").post(eventQuery);

module.exports = router;
