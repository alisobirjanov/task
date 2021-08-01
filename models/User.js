const { Schema, model} = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: {type: String, default: 'user'}
});

module.exports = model('User', UserSchema)