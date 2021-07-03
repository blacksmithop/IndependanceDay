//password strength regex
let strong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/; // alphanum and special characters
let weak = /[a-zA-Z]/;  // alphabets
let medium = /\d+/;
let mobilexp = /^(\d{3})(\.|-)?(\d{3})(\.|-)?(\d{4})$/;

function validateLogin() {
    isValid = true;
    const email = document.getElementById('email');
    const pwd = document.getElementById('password');


    // sanitize email
    if (email.value.trim() === '') {
        setAlert(email, "Email is empty", false);
    }
    else if (emailValid(email.value.trim()) == false) {
        setAlert(email, "Email is not valid", false);
        isValid = false;
    }
    else {
        setAlert(email, "Email is valid", true);
    }

    // check password
    if (pwd.value.trim() === '') {
        setAlert(pwd, "Password is empty", false);
        isValid = false;
    }
    // check lenght and all 3 criteria
    else if (password.value.trim().length >= 10
        && password.value.match(weak) &&
        password.value.match(medium) && password.value.match(strong)) {
        setAlert(pwd, "Password is valid", true);
        if (isValid == true)
            return true;
    }
    else {
        setAlert(pwd, "Password is not valid", false);
        isValid = false;
    }
    return isValid;
}

function emailValid(_email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(_email);
}

function setAlert(node, msg, error) {
    const elem = node.parentElement.querySelector('div');
    elem.innerHTML = msg;
    if (!(error)) {
        elem.className = 'p-0 alert alert-warning';
    }
    else {
        elem.className = 'p-0 alert alert-success';
    }
}


function validateSignup() {
    isValid = true;

    const fname = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const email = document.getElementById('email');
    const mobile = document.getElementById('mobile');
    const password = document.getElementById('password');
    const password2 = document.getElementById('password-repeat');


    if (fname.value.trim() === '') {
        setAlert(fname, "First-name cannot be empty", false);
        isValid = false;
    }
    else {
        setAlert(fname, "Accepted", true);
    }
    if (lname.value.trim() === '') {
        setAlert(lname, "Last-name cannot be empty", false);
        isValid = false;
    }
    else {
        setAlert(lname, "Accepted", true);
    }

    // sanitize email
    if (email.value.trim() === '') {
        setAlert(email, "Email is empty", false);
    }

    else if (emailValid(email.value.trim()) == false) {
        setAlert(email, "Email is not valid", false);
        isValid = false;
    }
    else {
        setAlert(email, "Email is valid", true);
    }

    if (mobile.value.trim() === '') {
        setAlert(mobile, "Mobile is empty", false);
        isValid = false;

    } else if (mobile.value.trim().match(mobilexp)) {
        setAlert(mobile, "Accepted", true);
    }
    else {
        setAlert(mobile, "Mobile is not valid", false);;
        isValid = false;
    }
    if (password.value.trim() === '') {
        setAlert(password, 'Password cannot be blank', false);
        isValid = false;
    }
    else if (password.value.trim().length >= 10 && password.value.match(weak) && password.value.match(medium) && password.value.match(strong)) {
        setAlert(password, 'Accepted', true);
    }
    else {
        setAlert(password, 'Password not accepted', false);
        isValid = false;
    }
    if (password2.value.trim() === '') {
        setAlert(password2, 'Password cannot be blank', false);
        isValid = false;
    }
    else if (password2.value.trim().length >= 10 && password2.value.match(weak) && password2.value.match(medium) && password2.value.match(strong)) {
        setAlert(password2, 'Accepted', true);
    }
    else {
        setAlert(password2, 'Password not accepted', false);
        isValid = false;
    }
    if (password.value !== password2.value) {
        setAlert(password2, 'Passwords do not match', false);
        isValid = false;
    }

    return isValid;
}


function validatePassword() {
    const p = document.getElementById('password');
    const text = document.getElementById("pwd-strength");
    const _weak = document.getElementById("weak");
    const _medium = document.getElementById("medium");
    const _strong = document.getElementById("strong");

    if (p.value.length <= 7 && (p.value.match(weak) ||
        p.value.match(medium) || p.value.match(strong))) {
        setAlert(p, "Password is too weak", false);
        _weak.className = "col bg-danger";
    }
    if (p.value.length >= 8 && ((p.value.match(weak) && p.value.match(medium)) ||
        (p.value.match(medium) && p.value.match(strong)) ||
        (p.value.match(weak) && p.value.match(strong)))) {
        setAlert(p, "Password is moderately strong", false);
        _medium.className = "col bg-warning";
    }
    if (p.value.length >= 10 && p.value.match(weak) &&
        p.value.match(medium) && p.value.match(strong)) {
        setAlert(p, "Password is strong", false);
        _strong.className = "col bg-success";
    }


}

