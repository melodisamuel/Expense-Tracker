const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "An expense must have an amount"],
  },
  category: {
    type: String,
    required: [true, "An expense must have a category"],
    unique: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
