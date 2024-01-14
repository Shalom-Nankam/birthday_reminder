const db = require("./db.config");
const express = require("express");
const job = require("./cronHandler");
const birthdayRouter = require("./router/birthdayRouter");

const app = express();

app.use(express.json());

app.use(express.static("views"));

app.use(express.urlencoded({ extended: true }));

app.use("/", birthdayRouter);

job.start();
db.connect();
app.listen(4005, () => {
  console.log("===========> server now listening");
});
