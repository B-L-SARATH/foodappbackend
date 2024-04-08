const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  email: { type: String, required: true },
  orders: { type: Array, required: true },
});

const Order = mongoose.model("Order", ordersSchema);

module.exports = Order;
