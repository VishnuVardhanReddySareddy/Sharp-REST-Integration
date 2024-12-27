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

  const expenseId = event.target.dataset.id;

  if (expenseId) {
    // Update existing expense
    axios
      .put(`${BASE_URL}/${expenseId}`, expenseDetails)
      .then((response) => {
        document.querySelector(
          `li[data-id="${expenseId}"]`
        ).textContent = `${response.data.amount} - ${response.data.description} - ${response.data.category}`;
        displayExpenseOnScreen(response.data);
        clearForm();
      })
      .catch((error) => console.log(error));
  } else {
    // Add new expense
    axios
      .post(BASE_URL, expenseDetails)
      .then((response) => displayExpenseOnScreen(response.data))
      .catch((error) => console.log(error));
  }
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
    document.getElementById("price").value = expense.amount;
    document.getElementById("product").value = expense.description;
    document.getElementById("category").value = expense.category;
    document.querySelector("form").dataset.id = expense.id; 
  });
}

function clearForm() {
  document.getElementById("price").value = "";
  document.getElementById("product").value = "";
  document.getElementById("category").value = "";
  document.querySelector("form").removeAttribute("data-id"); 
}
