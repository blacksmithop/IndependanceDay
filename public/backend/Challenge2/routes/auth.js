const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
var session = require('express-session');

//mongo
const { MongoClient } = require('mongodb');

// Load .env
var auth = express.Router();

// models
const LoginData = require("../model/UserData");
const UserData = require('../model/UserData');

// middleware
auth.use(express.json());
auth.use(express.json());
auth.use(bodyParser.urlencoded({ extended: true }));
auth.use(session({ secret: 'mySecret', resave: false, saveUninitialized: false }));


auth.use(express.urlencoded())

const asyncMiddleware = fn =>
    (req, res, next) => {
        Promise.resolve(sendEmail(req, res, next))
            .catch(next);
    };

auth.get('/', (req, res) => {
    res.render('index');
});

// email
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

auth.post('/', (req, res, next) => {
    email = req.body.emailid;
    fname = req.body.name;
    if (
        (isEmail(email) && (fname.length >= 2))
    ) {
        // check if user exists
        LoginData.findOne({ email: email }, function (err, user) {
            console.log("Here now");
            if (user) {
                console.log("user data", user)
                req.session.message = user;
                res.redirect('greet');
            }
            else {
                // no user
                console.log("Adding new user");
                var login = LoginData({
                    name: req.body.name, email: req.body.emailid
                });
                login.save().then(function (data) {
                    req.session.message = data;
                    res.redirect('greet');
                }).catch(function (error) {
                    console.log('Error', error);
                    req.session.message = "Error";
                    res.redirect('greet');
                })
            }
        });
    }
    else {
        req.session.message = "Error";
        res.redirect('greet');
    }

});


auth.post('/sendemail', asyncMiddleware(async (req, res, next) => {
    res.redirect('index');
}));

auth.get('/greet/:url?', (req, res, next) => {
    if (Object.keys(req.query).length != 0) {
        url = req.params.url;
        UserData.findById(url, function (err, user) {
            if (err) {
                req.session.message = "Error"
            }
            else if (user) {
                message = `Happy Independance day ${user.name}`;
                identity = user.__id;
            }
        });
    }
    else {
        response = req.session.message;
        if (response == "Error") {
            message = "Could not find user by id"
        }
        else {
            console.log(response);
            message = `Happy Independance day ${response.name}!!`
            identity = response._id;

        }
    }
    res.render('greet', { message: message, id: identity });
});



async function sendEmail(req, res, next) {

    email = req.body.emailid;
    fname = req.body.name;
    console.log("Sending email");
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo ????" <foo@example.com>', // sender address
        to: `${email},`, // list of receivers
        subject: "Happy Independence Day!", // Subject line
        text: "Hello world?", // plain text body
        html: `<b>Happy Independence Day ${fname}!!</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = auth;