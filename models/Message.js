const { Schema, model, Types } = require("mongoose");

const MessageSchema = new Schema({
  text: { type: String, required: true },
  author: { type: Types.ObjectId, ref: "User" },
  read: {type: Boolean, default: false},
  date: { type: Date, default: new Date() }
});

module.exports = model("Message", MessageSchema);
