const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeSheet = new Schema({
  name: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  clockin: {
    type: String,
    required: true,
  },
  clockout: {
    type: String,
    required: true,
  },
  Action: {
    type: String,
    required: true,
  },
  // UniqueId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "TimeSheet",
  //   required: true,
  // },
});
module.exports = TimeSheets = mongoose.model("time_sheet", TimeSheet);
