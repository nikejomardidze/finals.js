const cartCount = document.getElementById("cartCount");
const productsContainer = document.getElementById("productsContainer");
const toast = document.getElementById("toast");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const updateCartCount = () => {
  cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
};
updateCartCount();

let products = [];
const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.log("error", error);
  }
};

const renderProducts = (list) => {
  productsContainer.innerHTML = "";

  list.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <div class="category">${product.category}</div>
      <div class="price">$${product.price}</div>
    `;

    const addToCartBtn = document.createElement("button");
    addToCartBtn.textContent = "add to cart";
    addToCartBtn.classList.add("add-to-cart");

    const quantityBtn = document.createElement("button");
    quantityBtn.textContent = "+1";
    quantityBtn.classList.add("quantity-btn");
    quantityBtn.style.display = "none"; 

    addToCartBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      const inCart = cart.find(
        (item) => item.product.id === product.id
      );

      if (inCart) {
        inCart.quantity += 1;
        showToast("Quantity updated");
      } else {
        cart.push({ product: product, quantity: 1 });
        quantityBtn.style.display = "inline-block";
        showToast("Added to cart");
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      console.log(cart);
      console.log(quantityBtn);

    });

    quantityBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      const inCart = cart.find(
        (item) => item.product.id === product.id
      );

      if (inCart) {
        inCart.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        showToast("+1 added");
      }
    });
    productDiv.appendChild(addToCartBtn);
    productDiv.appendChild(quantityBtn);
    productsContainer.appendChild(productDiv);
  });
};

fetchProducts();