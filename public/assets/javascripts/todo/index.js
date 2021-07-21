$( ".login" ).click(function() {
    // validate input
    let user = $('.user').val();
    let pwd = $('.pwd').val();
    validate(user, pwd, success);
  });

validate = (user, pwd, callback) => {

  if (user == '') {
    failure(" Username is blank", ".username");
  }
    
  if (pwd == '') {
    failure(" Password is blank",".password");
  }
  if (user == "admin"){
      failure(" Username is correct",".username");
      
      if (pwd == "12345"){
        failure("Password is correct",".password");
        console.log(`Logging in as ${user}`);
        callback();
    }
    else {
      failure(" Password is incorrect",".password");

    }
  }
}

success = () => {
  $('.load-3').css("display", "block");

  setTimeout(
    function() 
    {
    window.location.href = "todo.html"
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

$(document).on('keypress',function(e) {
  if(e.which == 13) {
    $( ".login" ).trigger("click");
  }
});