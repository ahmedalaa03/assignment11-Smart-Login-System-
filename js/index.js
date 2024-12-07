'use strict'
const signinEmailInput = document.getElementById('signinEmail');
const signinPasswordInput = document.getElementById('signinPassword');
const loginBtn = document.getElementById('loginBtn');
const signupNameInput = document.getElementById('signupName');
const signupEmailInput = document.getElementById('signupEmail');
const signupPasswordInput = document.getElementById('signupPassword');
const signUpBtn = document.getElementById('signUpBtn');

// signUp page
let usersList = [];
if (localStorage.getItem("usersList") != null) {
    usersList = JSON.parse(localStorage.getItem("usersList"));
}
function addUser() {
    if (validateAllSignUpInputs()) {
        if (isSignUpEmpty()) {
            document.getElementById("condition1").innerHTML = `<span class=' text-danger'>All inputs is required</span>`;
        }
        else {
            if (emailExist()) {
                document.getElementById("condition1").innerHTML = `<span class=' text-danger'>email already exists</span>`;
            }
            else {
                let user = {
                    name: signupNameInput.value,
                    email: signupEmailInput.value,
                    password: signupPasswordInput.value,
                }
                usersList.push(user);
                localStorage.setItem("usersList", JSON.stringify(usersList));
                document.getElementById("condition1").innerHTML = `<span class=' text-success'>Success</span>`;
                clearForm();
            }
        }
    }
}
function isSignUpEmpty() {
    if (signupNameInput.value == "" || signupEmailInput.value == "" || signupPasswordInput.value == "") {
        return true;
    }
    else {
        return false;
    }
}
function emailExist() {
    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].email == signupEmailInput.value) {
            return true;
        }
    }
    return false;
}
function clearForm() {
    signupNameInput.value = "";
    signupEmailInput.value = "";
    signupPasswordInput.value = "";
}
// login page
// function login() { isSigninEmpty() ? document.getElementById("condition2").innerHTML = `<span class=' text-danger'>All inputs is required</span>` : isExistUser() ? isExistUser() : document.getElementById("condition2").innerHTML = `<span class=' text-danger'>incorrect email or password</span>`; }
function login() {
    if (validateAllLoginInputs()) {
        if (isSigninEmpty()) { document.getElementById("condition2").innerHTML = `<span class='text-danger'>All inputs are required</span>`; }
        else if (isExistUser()) { }
        else { document.getElementById("condition2").innerHTML = `<span class='text-danger'>Incorrect email or password</span>`; }
    }
}
function isSigninEmpty() {
    if (signinEmailInput.value == "" || signinPasswordInput.value == "") {
        return true;
    }
    else {
        return false;
    }
}
function isExistUser() {

    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].email == signinEmailInput.value && usersList[i].password == signinPasswordInput.value) {
            localStorage.setItem('homeList', JSON.stringify(usersList[i].name));
            location.replace("home.html");
            return true;
        }
    }
}

// home page
function welcome() {
    document.getElementById("uname").innerHTML = `Welcome ${JSON.parse(localStorage.getItem('homeList'))}`;
}
function logout() {
    localStorage.removeItem('homeList');
    location.href = "index.html";
}




function validate(input) {
    const regex = {
        signinEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        signinPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        signupName: /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/,
        signupEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        signupPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    }
    let isValid = regex[input.id].test(input.value);
    if (isValid) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        input.nextElementSibling.classList.replace('d-block', 'd-none');
    }
    else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        input.nextElementSibling.classList.replace('d-none', 'd-block');
    }
    return isValid;
}
function validateAllLoginInputs() {
    const allFilled = signinEmailInput.value.trim() && signinPasswordInput.value.trim();

    if (allFilled && validate(signinEmailInput) && validate(signinPasswordInput)) {
        loginBtn.removeAttribute('disabled');
        return true;
    } else {
        loginBtn.setAttribute('disabled', 'true');
        return false;
    }
}
function validateAllSignUpInputs() {
    const allFilled = signupNameInput.value.trim() && signupPasswordInput.value.trim() && signupNameInput.value.trim();

    if (allFilled && validate(signupEmailInput) && validate(signupPasswordInput) && validate(signupName)) {
        signUpBtn.removeAttribute('disabled');
        return true;
    } else {
        signUpBtn.setAttribute('disabled', 'true');
        return false;
    }
}
function removeValidationClasses() {
    signupNameInput.classList.remove('is-valid');
    signupNameInput.classList.remove('is-invalid');
    signupEmailInput.classList.remove('is-valid');
    signupEmailInput.classList.remove('is-invalid');
    signupPasswordInput.classList.remove('is-valid');
    signupPasswordInput.classList.remove('is-invalid');
}
