const mongoose = require("mongoose"),
  subscriberSChema = mongoose.Schema({
    name: String,
    email: String,
    zipCode: Number
  });
module.exports = mongoose.model("Subscriber", subscriberSChema);
