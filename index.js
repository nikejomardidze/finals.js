const form=document.getElementById("loginForm")
const userInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rePasswordInput = document.getElementById("password-repeat");

const userError = document.getElementById("userError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const rePasswordError = document.getElementById("rePasswordError");

const modal = document.getElementById("successModal");
const nextModalButton = document.getElementById("nextModal");

const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    userError.textContent="";
    emailError.textContent="";
    passwordError.textContent="";
    rePasswordError.textContent="";

    let hasError=false;
    if (userInput.value.length<3){
        userError.textContent="user must contain at least 3 symbols";
        hasError=true
    }
    if(!emailInput.value.includes("@") ||!emailInput.value.includes(".")){
        emailError.textContent="email must contain @ and . symbols";
        hasError=true
    }
    if (!passwordRegex.test(passwordInput.value)) {
        passwordError.textContent ="password must contain at least one capital letter, one number and one symbol";
        hasError=true
    }
    if (passwordInput.value !== rePasswordInput.value) {
        rePasswordError.textContent = "passwords do not match";
        hasError = true;
      }
    
      if(hasError) return;
      modal.style.display = "flex";
      form.reset();
  });

nextModalButton.addEventListener("click", () => {
    modal.style.display = "none";
    window.location.href = "../products/products.html";
  });