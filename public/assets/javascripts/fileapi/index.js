function show() {
    let fileInput = document.getElementsByClassName('form-control')[0];
    let file = fileInput.files;
    console.log(file);
}

$('input[type="file"]').on('change', function () {
    var reader = new FileReader();
    reader.onload = function () {
        var thisImage = reader.result;
        localStorage.setItem("imgData", thisImage);
    };
    reader.readAsDataURL(this.files[0]);
});

$('.btn-danger').click(function () {
    var dataImage = localStorage.getItem('imgData');
    console.log(dataImage);
    $('img').attr('src', dataImage);
});
