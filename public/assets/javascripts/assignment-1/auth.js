function validateLogin() {
    const email = document.getElementById('email');
    const pwd = document.getElementById('password');

    //password strength regex
    let strong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/; // alphanum and special characters
    let weak = /[a-zA-Z]/;  // alphabets
    let medium = /\d+/;

    // sanitize email
    if (email.value.trim() === '') {
        setAlert(email, "Email is empty", false);
        return false;
    }

    let status = emailValid(email.value.trim());

    if (!(status)) {
        setAlert(email, "Email is not valid", false);
        return false;
    }
    setAlert(email, "Email is valid", true);

    // check password
    if (pwd.value.trim() === '') {
        setAlert(pwd, "Password is empty", false);
        return false;
    }
    // check lenght and all 3 criteria
    else if (password.value.trim().length >= 10
        && password.value.match(weak) &&
        password.value.match(medium) && password.value.match(strong)) {

        return true;
    }
    else {
        setAlert(pwd, "Password is not valid", false);
        return false

    }
}

function emailValid(_email) {
    console.log("Checking email")
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(_email);
}

function setAlert(node, msg, error) {
    const elem = node.parentElement.querySelector('div');
    elem.innerHTML = msg;
    if (!(error)) {
        elem.className = 'alert alert-warning';
    }
    else {
        elem.className = 'alert alert-success';
    }
}