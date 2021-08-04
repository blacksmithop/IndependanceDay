const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const fs = require('fs');
var book = express.Router();

book.use(bodyParser.urlencoded({ extended: true }));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/book/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

book.get('/book', (req, res) => {

    let bookArray = JSON.parse(fs.readFileSync('./public/json/book.json'));

    res.render('book', { bookArray });
});

book.get('/addbook', (req, res) => {
    res.render('addbook');
})

book.post('/addbook', upload.single('uploaded_file'), (req, res) => {

    const bookObject = {};
    bookObject.name = req.body.name;
    bookObject.author = req.body.author;
    bookObject.genre = req.body.genre;
    bookObject.imageLink = req.file.originalname;
    bookObject.about = req.body.about;

    let rawdata = fs.readFileSync('./public/json/book.json');
    let books = JSON.parse(rawdata);
    books.push(bookObject);
    let booksJSON = JSON.stringify(books);
    fs.writeFileSync('./public/json/book.json', booksJSON);


    res.redirect('/book');

})


module.exports = book;