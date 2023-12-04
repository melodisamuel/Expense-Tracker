const Expense = require("./../models/expenseModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createExpense = catchAsync(async (req, res, next) => {
  const newExpense = await Expense.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      expense: newExpense,
    },
  });
});

exports.getAllExpense = catchAsync(async (req, res, next) => {
  const expenses = await Expense.find();

  res.status(200).json({
    status: "success",
    results: expenses.length,
    data: {
      expenses,
    },
  });
});

exports.getExpense = catchAsync(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return next(new AppError("No expense found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      expense,
    },
  });
});

exports.updateExpense = catchAsync(async (req, res, next) => {
  const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // runValidators: true,
  });

  if (!expense) {
    return next(new AppError("No expense found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      expense,
    },
  });
});

exports.deleteExpense = catchAsync(async (req, res, next) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);

  if (!expense) {
    return next(new AppError("No expense found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
