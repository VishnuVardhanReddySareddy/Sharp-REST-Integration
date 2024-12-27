
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("expense", "root", "Newyork@1234", {
  host: "localhost",
  dialect: "mysql",
});

const Expense = sequelize.define("Expense", {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => console.log("Expense table created successfully!"))
  .catch((err) => console.error("Unable to create table:", err));

module.exports = Expense;
