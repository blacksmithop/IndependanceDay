const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const fs = require('fs');
var author = express.Router();

author.use(bodyParser.urlencoded({ extended: true }));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/author/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

author.get('/author', (req, res) => {

    let authArray = JSON.parse(fs.readFileSync('./public/json/author.json'));

    res.render('author', { authArray });
});

author.get('/addauthor', (req, res) => {
    res.render('addauthor');
})

author.post('/addauthor', upload.single('uploaded_file'), (req, res) => {

    const bookObject = {};
    bookObject.name = req.body.name;
    bookObject.country = req.body.country;
    bookObject.language = req.body.genlanguagere;
    bookObject.imageLink = req.file.originalname;
    bookObject.title = req.body.title;

    let rawdata = fs.readFileSync('./public/json/author.json');
    let books = JSON.parse(rawdata);
    books.push(bookObject);
    let booksJSON = JSON.stringify(books);
    fs.writeFileSync('./public/json/author.json', booksJSON);

    res.redirect('/author');

})


module.exports = author;