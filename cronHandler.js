const { CronJob } = require("cron");
const birthdayController = require("./controller/birthdayController");

const job = new CronJob(
  // "0 7 * * *",
  "*/2 14 * * *",
  function () {
    birthdayController.sendMails();
  },
  null,
  false,
  "UTC+1"
);
module.exports = job;
