document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem("savedUserName");
    if (username) {
        document.getElementById('username').innerText = "Welcome " + username;
    }
});


const card = document.querySelector(".card-3d-wrap");
document.getElementById('create').addEventListener('click', () => {
    document.getElementById('reg-log').checked = true;
    card.style.height = "450px";
});

document.getElementById('loging').addEventListener('click', () => {
    document.getElementById('reg-log').checked = false;
    card.style.height = "400px";
});

const signName = document.getElementById('nameS');
const signEmail = document.getElementById('emailS');
const signPassword = document.getElementById('passwordS');
const successMsg = document.getElementById('allerrors');
const nameError = document.getElementById('nameerror');
const emailError = document.getElementById('emailerror');
const passwordError = document.getElementById('passworderror');
let users = JSON.parse(localStorage.getItem('arr')) || [];

signName.addEventListener('input', () => {
    nameValidation();
    clearSuccessMsg();
});
signEmail.addEventListener('input', () => {
    emailValidation();
    clearSuccessMsg();
});
signPassword.addEventListener('input', () => {
    passwordValidation();
    clearSuccessMsg();
});

document.getElementById('signup-btn').addEventListener('submit', signUp);

function signUp() {
    inputsValidation()
    if (inputsValidation()) {
        if (emailExist()) {
            emailError.innerText = "Email already exists!";
            successMsg.innerText = "";
            successMsg.classList.remove('text-success');
            successMsg.classList.add('text-danger');
        }

        else {
            const newUser = {
                name: signName.value,
                email: signEmail.value,
                password: signPassword.value
            };
            users.push(newUser);
            localStorage.setItem('arr', JSON.stringify(users));
            console.log('hii');
            successMsg.innerText = "Sign-up successful!";
            successMsg.classList.add('text-success');
            successMsg.classList.remove('text-danger');
            successMsg.classList.replace('d-none', 'd-block');
            document.getElementById('reg-log').checked = false;
            clearForm();
        }
    }

}

function clearForm() {
    signName.value = '';
    signEmail.value = '';
    signPassword.value = '';
    document.querySelectorAll('.is-valid').forEach(elem => elem.classList.remove('is-valid'));
    document.querySelectorAll('.error-message').forEach(elem => elem.innerText = '');
}

function clearSuccessMsg() {
    successMsg.innerText = '';
    successMsg.classList.remove('text-danger', 'text-success');
}

function emailExist() {
    return users.some(user => user.email === signEmail.value);
}

function nameValidation() {
    const regExp = /^[A-Za-z\s]{2,10}$/;
    if (!regExp.test(signName.value) && signName.value !== '') {
        signName.classList.add("is-invalid");
        signName.classList.remove("is-valid");
        nameError.innerText = "Invalid name!";
        return false;
    } else {
        signName.classList.remove("is-invalid");
        signName.classList.add("is-valid");
        nameError.innerText = "";
        return true;
    }
}

function emailValidation() {
    const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
    if (!regExp.test(signEmail.value) && signEmail.value !== '') {
        signEmail.classList.add("is-invalid");
        signEmail.classList.remove("is-valid");
        emailError.innerText = "Invalid email!";
        return false;
    } else {
        signEmail.classList.remove("is-invalid");
        signEmail.classList.add("is-valid");
        emailError.innerText = "";
        return true;
    }
}

function passwordValidation() {
    const regExp = /^.{5,15}$/;
    if (regExp.test(signPassword.value)) {
        signPassword.classList.add("is-valid");
        signPassword.classList.remove("is-invalid");
        passwordError.classList.add("d-none");
        return true;
    } else if (signPassword.value !== '') {
        signPassword.classList.add("is-invalid");
        signPassword.classList.remove("is-valid");
        passwordError.classList.remove("d-none");
        return false;
    }
}

function inputsValidation() {
    if (signName.value == '' || signEmail.value == '' || signPassword.value == '') {
        successMsg.innerText = "All inputs are required!";
        successMsg.classList.add('text-danger');
        successMsg.classList.remove('text-success');
        return false
    }

    const nameValid = nameValidation();
    const emailValid = emailValidation();
    const passwordValid = passwordValidation();
    return nameValid && emailValid && passwordValid;

}

document.getElementById('login-btn').addEventListener('click', login);

function login() {
    const loginEmail = document.getElementById('emailL').value;
    const loginPassword = document.getElementById('passwordL').value;
    const fillMsg = document.getElementById('fillmsg');

    fillMsg.classList.add('d-none');

    if (!loginEmail || !loginPassword) {
        fillMsg.classList.replace('d-none', 'd-block');
        fillMsg.innerText = "All inputs are required!";
        return false;
    }

    const user = users.find(user => user.email.toLowerCase() === loginEmail.toLowerCase() && user.password === loginPassword);

    if (user) {
        localStorage.setItem('savedUserName', user.name);
        fillMsg.classList.replace('d-none', 'd-block');
        fillMsg.classList.add('text-success');
        fillMsg.innerText = "Success!";
        window.location.href = "home.html";
        return true;
    } else {
        fillMsg.classList.replace('d-none', 'd-block');
        fillMsg.innerText = "Wrong inputs!";
        return false;
    }
}