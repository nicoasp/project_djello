const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = Schema({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});


const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;