const email = document.getElementById("email");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const loginForm = document.getElementById("loginForm");
const popup = document.getElementById("successPopup");
const closeBtn = document.getElementById("closeBtn");

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  if (password.length < 8 || password.length > 32) {
    return false;
  }
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  return hasUpperCase && hasLowerCase;
}

function showError({ input, fieldErr, show }) {
  const errElement = document.getElementById(fieldErr);
  const inputElement = document.getElementById(input);
  errElement.classList.toggle("hidden", !show);
  inputElement.classList.toggle("border-border", !show);
  inputElement.classList.toggle("border-red-700", show);
}

function checkForm() {
  const emailValid = validateEmail(email.value);
  const passwordValid = validatePassword(password.value);
  const check = emailValid && passwordValid;
  submitBtn.classList.toggle("cursor-pointer", check);
  submitBtn.classList.toggle("cursor-not-allowed", !check);
  submitBtn.classList.toggle("bg-primary", check);
  submitBtn.classList.toggle("bg-primary/60", !check);
  submitBtn.disabled = !check;
}

function showSuccessPopup() {
  popup.classList.remove("hidden");
}

function closeSuccessPopup() {
  popup.classList.add("hidden");
}

email.addEventListener("input", function () {
  if (this.value.length > 0) {
    showError({
      input: "email",
      fieldErr: "errEmail",
      show: !validateEmail(this.value),
    });
  } else {
    showError({ input: "email", fieldErr: "errEmail", show: false });
  }
  checkForm();
});
password.addEventListener("input", function () {
  if (this.value.length > 0) {
    showError({
      input: "password",
      fieldErr: "errPassword",
      show: !validatePassword(this.value),
    });
  } else {
    showError({ input: "password", fieldErr: "errPassword", show: false });
  }
  checkForm();
});

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validateEmail(email.value) && validatePassword(password.value)) {
    showSuccessPopup();
  }
});

closeBtn.addEventListener("click", function () {
  closeSuccessPopup();
});

popup.addEventListener("click", function (e) {
  if (e.target === this) closeSuccessPopup();
});
