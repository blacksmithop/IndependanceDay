const express = require('express')
const auth = require('./routes/auth');
const author = require('./routes/author');
const book = require('./routes/book');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/views')
app.use(express.static(__dirname + '/public'));

var index = express.Router();

// Log usage to console
index.use('/', (req, res, next) => {
    console.log(`Request: ${req.originalUrl} (${req.method})`)
    next()
})

index.get('/', (req, res) => {
    res.render('index');
});


app.use(index)
app.use(auth)
app.use(author)
app.use(book)

const port = (process.env.PORT ||3000)

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});