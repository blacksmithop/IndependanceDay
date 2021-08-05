// Email validation regex
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$('#fname, #lname').change(function () {
    let toggle = $(this).siblings('.valid-feedback')
    if ($(this).val().length > 1) {
        toggle.css('display', 'block');
    }
    else {
        toggle.css('display', 'none');
    }
})



$('#email').change(function () {
    let toggle = $(this).siblings('.invalid-feedback')
    let success = $(this).siblings('.valid-feedback')
    if (isEmail($(this).val())) {
        toggle.css('display', 'none');
        success.css('display', 'block');
    }
    else {
        toggle.css('display', 'block');
        success.css('display', 'none');
    }
});


$('#username').change(function () {
    let user = $(this).val();
    let toggle = $(this).siblings('.invalid-feedback')
    let success = $(this).siblings('.valid-feedback')

    if ((user.length >= 5) && (user.length <= 10)) {
        toggle.css('display', 'none');
        success.css('display', 'block');
    }
    else {
        toggle.css('display', 'block');
        success.css('display', 'none');
    }
})

$('#pincode').change(function () {
    let toggle = $(this).siblings('.invalid-feedback')
    let success = $(this).siblings('.valid-feedback')

    if (($.isNumeric($(this).val()))
        && ($(this).val().length >= 3)
    ) {
        toggle.css('display', 'none');
        success.css('display', 'block');
    }
    else {
        toggle.css('display', 'block');
        success.css('display', 'none');
    }
})


$('#password').change(function () {
    let value = $(this).val()
    let toggle = $(this).siblings('.invalid-feedback')
    let success = $(this).siblings('.valid-feedback')
    if (value.length < 5) {
        toggle.css('display', 'block');
        success.css('display', 'none');

    }
    else {
        toggle.css('display', 'none');
        success.css('display', 'block');
    }
})

$('#password2').change(function () {
    let value = $(this).val()
    let toggle = $(this).siblings('.invalid-feedback')
    let success = $(this).siblings('.valid-feedback')
    if ((value.length >= 5) && (value == $("#password").val())) {
        toggle.css('display', 'none');
        success.css('display', 'block');

    }
    else {
        toggle.css('display', 'block');
        success.css('display', 'none');
    }
})

// Form submit
$( 'form' ).submit(function( event ) {
    var all = $(".valid-feedback").map(function() {
        return $(this).css('display') == 'block';
    }).get();
    
    //check all true
    let checker = arr => arr.every(v => v === true);

    if (checker(all)){
        alert( "Success! The form data is valid" );
    } 
    event.preventDefault();
  });