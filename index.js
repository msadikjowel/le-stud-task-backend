// packages
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const authRoute = require('./auth')
// setup app
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// setup session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

// setup passport
app.use(passport.initialize());

// using passport
app.use(passport.session());


// database connection
mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log('database connected successfully'))
    .catch(err => console.log(err));


// using route
app.use('/', authRoute)

// running server
app.listen(9000, () => {
    console.log('server running at port 9000')
});