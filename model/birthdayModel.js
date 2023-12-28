const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BirthdaySchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const BirthdayModel = mongoose.model("Birthday", BirthdaySchema);
module.exports = BirthdayModel;
