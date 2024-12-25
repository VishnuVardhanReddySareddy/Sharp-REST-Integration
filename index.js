const BASE_URL =
  "https://crudcrud.com/api/3a12fbc554c847eb8491b97a1713eb83/products";

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(BASE_URL)
    .then((response) => {
      response.data.forEach((product) => displayProductOnScreen(product));
    })
    .catch((error) => console.log("Error fetching products:", error));
});

function handleFormSubmit(event) {
  event.preventDefault();

  const productDetails = {
    price: event.target.price.value,
    product: event.target.product.value,
    category: event.target.category.value,
  };

  axios
    .post(BASE_URL, productDetails)
    .then((response) => displayProductOnScreen(response.data))
    .catch((error) => console.log(error));

  document.getElementById("price").value = "";
  document.getElementById("product").value = "";
  document.getElementById("category").value = "";
}

function displayProductOnScreen(productDetails) {
  const productItem = document.createElement("li");
  productItem.setAttribute("data-id", productDetails._id);
  productItem.appendChild(
    document.createTextNode(
      `${productDetails.price} - ${productDetails.product} - ${productDetails.category}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  productItem.appendChild(deleteBtn);

  const productList = document.getElementById(productDetails.category);
  productList.appendChild(productItem);

  deleteBtn.addEventListener("click", function () {
    const productId = productItem.getAttribute("data-id");

    axios
      .delete(`${BASE_URL}/${productId}`)
      .then(() => {
        productList.removeChild(productItem);
      })
      .catch((error) => console.log(error));
  });
}
