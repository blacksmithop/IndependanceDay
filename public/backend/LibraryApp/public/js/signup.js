$(".login").click(function () {
  // validate input
  let name = $('.name').val();
  let user = $('.user').val();
  let pwd = $('.pwd').val();
  let pwd2 = $('.pwd2').val();
  validate(name, user, pwd, pwd2, success);
});

validate = (name, user, pwd, pwd2, callback) => {

  if (user == '') {
    failure(" Username is blank", ".username");
  }
  if (name == '') {
    failure(" Name is blank", ".fname");
  }
  else {
    failure(" Name accepted", ".fname");
  }

  if (user.length >= 5)  {
    failure(" Username is valid", ".username");

    let str = passwordStrength(pwd);
    if (str == 3) {
      failure("Password is valid", ".password");

    }
    else {
      failure(" Password is not strong enough", ".password");
    }
    
    let str2 = passwordStrength(pwd2);
    if (str2 == 3) {
      failure("Password is valid", ".password2");
    }
    else {
      failure(" Password is not strong enough", ".password2");
    }
    if (pwd != pwd2){
      failure("Passwords don't match", ".password2");
    }
    else if ((str == 3) && (str == str2)){
      console.log(`Logging in as ${user}`);
      callback();
    }
  }
  else {
    failure("Minimum length: 5", ".username");

  }
  if (pwd == '') {
    failure(" Password is blank", ".password");
  }
  if (pwd2 == '') {
    failure(" Password is blank", ".password2");
  }
}

success = () => {
  $('.load-3').css("display", "block");

  setTimeout(
    function () {
      window.location.href = "/"
    }, 2000);
}

failure = (message, cls) => {
  $(cls).text(message);
}

$('.user').click(() => {
  $('.username').text('')
})

$('.pwd').click(() => {
  $('.password').text('')
})

$(document).on('keypress', function (e) {
  if (e.which == 13) {
    $(".login").trigger("click");
  }
});

let strong = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/; // alphanum and special characters
let weak = /[a-zA-Z]/;  // alphabets
let medium = /\d+/;
let mobilexp = /^(\d{3})(\.|-)?(\d{3})(\.|-)?(\d{4})$/;

function passwordStrength(pwd) {

  let str = 0;

  if (pwd.length <= 7 && (pwd.match(weak) ||
    pwd.match(medium) || pwd.match(strong))) {
    str = 1;
  }
  if (pwd.length >= 8 && ((pwd.match(weak) && pwd.match(medium)) ||
    (pwd.match(medium) && pwd.match(strong)) ||
    (pwd.match(weak) && pwd.match(strong)))) {
    str = 2;
  }
  if (pwd.length >= 10 && pwd.match(weak) &&
    pwd.match(medium) && pwd.match(strong)) {
    str = 3;
  }
  return str
}

