const Expense = require("../models/expense");

exports.createExpense = async (req, res) => {
  try {
    const { amount, description, category } = req.body;
    const newExpense = await Expense.create({ amount, description, category });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, category } = req.body;
    await Expense.update({ amount, description, category }, { where: { id } });
    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
