const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenBlacklistSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("TokenBlacklist", tokenBlacklistSchema);
