const express=require('express');

var auth = express.Router();


auth.get('/login', (req, res) => {
    res.render('login');
});

auth.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports=auth;