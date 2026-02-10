const cartContainer = document.getElementById("cartContainer");
const emptyCart = document.getElementById("empty");
const totalPriceEl = document.getElementById("total");
const cartCount = document.getElementById("cartCount");
const orderBtn=document.getElementById("order")
const productContainer=document.getElementById("productContainer")

const updateCartCount = () => {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
};
const cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount()

const renderCart=()=>{
    cartContainer.innerHTML="";

    if (cart.length===0){
        emptyCart.style.display="block"
        totalPriceEl.textContent="0"
        return
    }
    emptyCart.style.display="none"
    let total=0

    cart.forEach((item, index)=>{
        total+=item.product.price*item.quantity

        const div=document.createElement("div")
        div.classList.add("cart-product")

        div.innerHTML=` <img src="${item.product.image}" alt="${item.product.title}">
        <h3>${item.product.title}</h3>
        <p>$${item.product.price}</p>
        <p>Quantity: ${item.quantity}</p>`;

        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+1"
        plusBtn.classList.add("quantity-btn")
    
        plusBtn.addEventListener("click", () => {
          item.quantity++
          saveAndRender();
          updateCartCount()
        });
        const minusBtn = document.createElement("button");
        minusBtn.textContent = "-1";
        minusBtn.classList.add("quantity-btn");
    
        minusBtn.addEventListener("click", () => {
          if (item.quantity > 1) {
            item.quantity--
            saveAndRender();
            updateCartCount()
          }
        });
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete";
        deleteBtn.classList.add("delete-btn");
    
        deleteBtn.addEventListener("click", () => {
          cart.splice(index, 1);
          saveAndRender();
          updateCartCount()
        });
        cartContainer.appendChild(div);
        div.appendChild(deleteBtn)
        div.appendChild(plusBtn)
        div.appendChild(minusBtn)
    });
    totalPriceEl.textContent = total.toFixed(2);

    const saveAndRender=()=>{
        localStorage.setItem("cart", JSON.stringify(cart))
        renderCart()
    }
    orderBtn.addEventListener("click",() =>{
        if(cart.length===0)
        return alert("order was sucessful")
      localStorage.removeItem("cart")
      cart.length=0
         window.location.href="../products/products.html"
    })
}     
renderCart()
