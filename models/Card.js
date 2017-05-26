const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CardSchema = Schema({
  title: { type: String, required: true },
  description: { type: String },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  activities: [{ type: Schema.Types.ObjectId, ref: "Activity" }],
});


const Card = mongoose.model("Card", CardSchema);

module.exports = Card;