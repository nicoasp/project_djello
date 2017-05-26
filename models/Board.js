const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const BoardSchema = Schema({
  title: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  lists: [{ type: Schema.Types.ObjectId, ref: "List" }],
});


const Board = mongoose.model("Board", BoardSchema);

module.exports = Board;
