const name1=document.getElementById("name")
const email1=document.getElementById("email")
const date1=document.getElementById("date")
const updateCartCount = () => {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
};
const cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount()


const fetchUser=async()=>{
    try{
        const response=await fetch("https://fakestoreapi.com/users/1")
        const user=await response.json();
        name1.textContent=`${user.name.firstname} ${user.name.lastname}`;
        email1.textContent = user.email;
        date1.textContent = new Date().toLocaleDateString()
    }catch(error){
        console.log("error", error)
    }

    const editBtn=document.createElement("button")
    editBtn.textContent="edit"
    editBtn.classList.add("edit-Btn")

    editBtn.addEventListener("click", ()=>{
        nameInput.value=name1.textContent
        emailInput.value=email1.textContent

        name1.style.display="none"
        email1.style.display="none"

        nameInput.style.display="inline"
        emailInput.style.display="inline"

        editBtn.style.display="none"
        saveBtn.style.display="inline"
    })
    const saveBtn=document.createElement("button")
    saveBtn.textContent="save"
    saveBtn.classList.add("save-Btn")

    saveBtn.addEventListener("click", () => {
        name1.textContent = nameInput.value;
        email1.textContent = emailInput.value;
      
        name1.style.display = "inline";
        email1.style.display = "inline";
      
        nameInput.style.display = "none";
        emailInput.style.display = "none";
      
        saveBtn.style.display = "none";
        editBtn.style.display = "inline";
      });
      document.body.appendChild(editBtn);
      document.body.appendChild(saveBtn);

};
fetchUser();