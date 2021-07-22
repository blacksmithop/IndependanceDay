// variables, arrays etc.
var todoArray;
var completed = [];
//


$( ".logout" ).click(function() {
  // log the user out
  logout(logout);
});

logout = () => {
  window.location.href = "index.html"
}


$('.btn').on('hide.bs.dropdown', function (e) {
  if (e.clickEvent) {
    e.preventDefault();
  }
})

$('.btn').on('click', function (e) {
  e.stopPropagation();
})


$(document).ready(function () {

  let url = 'https://jsonplaceholder.typicode.com/todos';

  fetch(url).then(response =>
    response.json().then(data => ({
      data: data,
      status: response.status
    })
    ).then(res => {
      console.log(`Status: ${res.status}`, `Length: ${res.data.length}`)
      console.log(res.data);
      todoArray = res.data;
      populateTodo();
    }));

})


// Keep track of todo - (move to Promises)
$(document).on('click', 'label', function (e) {
  let label = this
  let span = $(this).find('span')[0];
  let checkbox = $(this).find('input')[0];
  let item = span.innerHTML;
  let cname = span.className;
  let taskValidate = new Promise(function (resolve, reject) {
    if (cname == "locked"){
      reject("Locked checkbox, ignoring");
      return false;
    }

    if (!(completed.includes(item))){
        completed.push(item);
        $(label).css({"color":"586186", "text-decoration": "line-through"});
        $(checkbox).prop('checked', true);
    }
    else {
      var index = completed.indexOf(item);
      if (index >= 0) {
        completed.splice( index, 1 );
      }
      console.log(`Length: ${completed.length}`);
      $(checkbox).prop('checked', false);
      $(label).css({"color":"", "text-decoration": ""});
      throw("Removing from list");

    }
    
    // some code (try to change x to 5)
    if (completed.length == 5) {
      console.log(`Length: ${completed.length}`);
      resolve(`You have done 5 tasks!`);
    }
    else {
      reject(completed.length);
    }
  });

  taskValidate.then(
    function (value) { alert(value); },
    function (error) { console.log(`Length: ${error}`); }
  ).catch(function(error){
      console.log(error);
    });
    return false;
});


function populateTodo() {
  todoArray.forEach(function (todoArr) {
    var done = todoArr.completed?"checked disabled":"";
    var locked = todoArr.completed?"locked":"unlocked";
    var item = `<li><label><input type="checkbox" ${done}><i></i><span class='${locked}'>${capFirst(todoArr.title)}</span><a href='#'>–</a></label></li>`
    $('.todo').append(item);
  });
}


function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



//To-Do jQuery
$(".tdl-new").bind('keypress', function (e) {
  var code = (e.keyCode ? e.keyCode : e.which);
  if (code == 13) { //enter key
    var v = $(this).val();
    var s = v.replace(/ +?/g, '');
    if (s == "") {
      return false;
    } else {
      $(".tdl-content ul").append("<li><label><input type='checkbox'><i></i><span>" + v + "</span><a href='#'>–</a></label></li>");
      $(this).val("");
    }
  }
});




$(".tdl-content").on('click', "a", function () {
  var _li = $(this).parent().parent("li");
  _li.addClass("remove").stop().delay(100).slideUp("fast", function () {
    _li.remove();
  });
  return false;
});



