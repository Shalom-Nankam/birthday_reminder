const express = require("express");
const router = express.Router();
const controller = require("../controller/birthdayController");
const path = require("path");

router.post("/", controller.createRecord);

router.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "..", "views", "home.html"));
});

module.exports = router;
