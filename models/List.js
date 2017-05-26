const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ListSchema = Schema({
  title: { type: String, required: true },
  description: { type: String },
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
});


const List = mongoose.model("List", ListSchema);

module.exports = List;