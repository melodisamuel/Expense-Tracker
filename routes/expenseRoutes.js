const express = require("express");
const router = express.Router();
const authController = require("./../controllers/authController");
const expenseController = require("./../controllers/expenseController");

// router.route("/create").post(expenseController.createExpense);

router
  .route("/")
  .get(authController.protect, expenseController.getAllExpense)
  .post(expenseController.createExpense);

router
  .route("/:id")
  .get(expenseController.getExpense)
  .patch(expenseController.updateExpense)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "manager"),
    expenseController.deleteExpense
  );

module.exports = router;
