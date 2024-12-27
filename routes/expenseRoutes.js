
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/expenses', expenseController.createExpense);
router.get('/expenses', expenseController.getAllExpenses);
router.delete('/expenses/:id', expenseController.deleteExpense);
router.put('/expenses/:id', expenseController.updateExpense); // Bonus Task

module.exports = router;
