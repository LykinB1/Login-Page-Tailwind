import './style.css';

const inputPassword = document.getElementById('password');
const buttonPassword = document.getElementById('button-password');
const inputEmail = document.getElementById('email');
const submitButton = document.getElementById('submit-button');

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hasUpper = /[A-Z]/;
const hasLower = /[a-z]/;
const hasNumber = /[0-9]/;
const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;

function showPassword() {
  if (inputPassword.type === 'password') {
    inputPassword.setAttribute('type', 'text');
    buttonPassword.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
  } else {
    inputPassword.setAttribute('type', 'password');
    buttonPassword.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
  }
}

let emailTimeout;
function checkEmail() {
  clearTimeout(emailTimeout);
  inputEmail.classList.remove('border', 'border-red-500', 'border-green-500', 'border-transparent');
  const emailValue = inputEmail.value.trim();

  if (emailValue === '') {
    inputEmail.classList.add('border', 'border-transparent');
    submitPermission();
    return;
  }


  emailTimeout = setTimeout(() => {
    if (!regex.test(emailValue)) {
      inputEmail.classList.add('border', 'border-red-500');
    } else {
      inputEmail.classList.add('border', 'border-green-500');
    }
    submitPermission();
  }, 4000);
}

let passwordTimeout;
function checkPassword() {
  clearTimeout(passwordTimeout);
  inputPassword.classList.remove('border', 'border-red-500', 'border-green-500', 'border-transparent');
  const passValue = inputPassword.value.trim();

  if (passValue.length === 0) {
    inputPassword.classList.add('border', 'border-transparent');
    submitPermission();
    return;
  }

  passwordTimeout = setTimeout(() => {
    const minLength = passValue.length >= 8;
    const hasLowerCase = hasLower.test(passValue);
    const hasUpperCase = hasUpper.test(passValue);
    const hasNumberVal = hasNumber.test(passValue);
    const hasSpecialChar = hasSpecial.test(passValue);

    if (minLength && hasLowerCase && hasUpperCase && hasNumberVal && hasSpecialChar) {
      inputPassword.classList.add('border', 'border-green-500');
    } else {
      inputPassword.classList.add('border', 'border-red-500');
    }
    submitPermission();
  }, 1000);
}

function submitPermission() {
  const emailValid = inputEmail.classList.contains('border-green-500');
  const passwordValid = inputPassword.classList.contains('border-green-500');
  submitButton.disabled = !(emailValid && passwordValid);
}

inputEmail.addEventListener('input', () => {
  checkEmail();
});

inputPassword.addEventListener('input', () => {
  checkPassword();
});

buttonPassword.addEventListener('click', showPassword);
