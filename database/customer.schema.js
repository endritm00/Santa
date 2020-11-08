const mongoose = require('mongoose');

const { Schema } = mongoose;

const customerSchema = new Schema({
    customer_email: String,
    payment_id : String,
    child_name: String
  });

  const Customer = mongoose.model("customer", customerSchema);

  module.exports = Customer;