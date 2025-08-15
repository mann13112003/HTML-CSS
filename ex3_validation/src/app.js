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
  if (show) {
    errElement.classList.remove("hidden");
    inputElement.classList.remove("border-border");
    inputElement.classList.add("border-red-700");
  } else {
    errElement.classList.add("hidden");
    inputElement.classList.remove("border-red-700");
    inputElement.classList.add("border-border");
  }
}

function checkForm() {
  const emailValid = validateEmail(email.value);
  const passwordValid = validatePassword(password.value);

  if (emailValid && passwordValid) {
    submitBtn.disabled = false;
    submitBtn.classList.remove("cursor-not-allowed");
    submitBtn.classList.add("cursor-pointer");
    submitBtn.classList.remove("bg-primary/60");
    submitBtn.classList.add("bg-primary");
  } else {
    submitBtn.disabled = true;
    submitBtn.classList.remove("cursor-pointer");
    submitBtn.classList.add("cursor-not-allowed");
    submitBtn.classList.remove("bg-primary");
    submitBtn.classList.add("bg-primary/60");
  }
}

function showSuccessPopup() {
  popup.classList.remove("hidden");
}

function closeSuccessPopup() {
  popup.classList.add("hidden");
}

email.addEventListener("input", function () {
  if (email.value.length > 0) {
    showError({
      input: "email",
      fieldErr: "errEmail",
      show: !validateEmail(email.value),
    });
  } else {
    showError({ input: "email", fieldErr: "errEmail", show: false });
  }
  checkForm();
});
password.addEventListener("input", function () {
  if (password.value.length > 0) {
    showError({
      input: "password",
      fieldErr: "errPassword",
      show: !validatePassword(password.value),
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
