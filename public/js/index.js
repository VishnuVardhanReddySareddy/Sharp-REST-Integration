const BASE_URL = "http://localhost:3000/api/expenses";

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(BASE_URL)
    .then((response) => {
      response.data.forEach((expense) => displayExpenseOnScreen(expense));
    })
    .catch((error) => console.log("Error fetching expenses:", error));
});

function handleFormSubmit(event) {
  event.preventDefault();

  const expenseDetails = {
    amount: event.target.price.value,
    description: event.target.product.value,
    category: event.target.category.value,
  };

  axios
    .post(BASE_URL, expenseDetails)
    .then((response) => displayExpenseOnScreen(response.data))
    .catch((error) => console.log(error));

  event.target.reset();
}

function displayExpenseOnScreen(expense) {
  const expenseItem = document.createElement("li");
  expenseItem.setAttribute("data-id", expense.id);
  expenseItem.appendChild(
    document.createTextNode(
      `${expense.amount} - ${expense.description} - ${expense.category}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  expenseItem.appendChild(deleteBtn);

  const updateBtn = document.createElement("button");
  updateBtn.appendChild(document.createTextNode("Edit"));
  expenseItem.appendChild(updateBtn);

  const expenseList = document.getElementById(expense.category);
  expenseList.appendChild(expenseItem);

  deleteBtn.addEventListener("click", function () {
    const expenseId = expenseItem.getAttribute("data-id");

    axios
      .delete(`${BASE_URL}/${expenseId}`)
      .then(() => {
        expenseList.removeChild(expenseItem);
      })
      .catch((error) => console.log(error));
  });

  updateBtn.addEventListener("click", function () {
    const newDetails = prompt(
      "Enter new details (amount-description-category):"
    ).split("-");
    const updatedExpense = {
      amount: newDetails[0],
      description: newDetails[1],
      category: newDetails[2],
    };

    const expenseId = expenseItem.getAttribute("data-id");
    axios
      .put(`${BASE_URL}/${expenseId}`, updatedExpense)
      .then(() => {
        expenseItem.textContent = `${updatedExpense.amount} - ${updatedExpense.description} - ${updatedExpense.category}`;
        expenseItem.appendChild(deleteBtn);
        expenseItem.appendChild(updateBtn);
      })
      .catch((error) => console.log(error));
  });
}
