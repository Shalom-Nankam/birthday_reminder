const BirthdayModel = require("../model/birthdayModel");
const SendMail = require("../mailer");
const Template = require("../template");

const createRecord = async function (req, res) {
  try {
    const { username, email, dob } = req.body;

    const existingRecord = await BirthdayModel.findOne({ email: email }).exec();

    if (existingRecord) {
      return res
        .status(401)
        .json({ success: false, message: "You already have an entry" });
    }

    const newRecord = new BirthdayModel({
      username: username,
      email: email,
      dob: dob,
    });

    await newRecord.save();

    const recordResponse = await BirthdayModel.findOne({
      username: username,
    }).exec();
    return res.status(200).json({ success: true, message: recordResponse });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const sendMails = async () => {
  const dateToday = new Date(Date.now());
  const formattedDate = Intl.DateTimeFormat("en-GB")
    .format(dateToday)
    .split("/")
    .reverse()
    .join("-");

  const birthdays = await BirthdayModel.find({ dob: formattedDate }).exec();
  birthdays.forEach((birthday) => {
    const message = `Happy Birthday, ${birthday.username}!`;
    const options = {
      from: "Admin <wildbase22@gmail.com>",
      to: birthday.email,
      subject: "Happy Birthday",
      text: message,
      html: Template(message),
    };

    SendMail(options, (info) => {
      console.log({ info });
    });
  });
};

module.exports = {
  createRecord,
  sendMails,
};
