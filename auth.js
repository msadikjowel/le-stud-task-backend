// require express router and passport
const router = require('express').Router();
const passport = require('passport')

// require user
const User = require('./user');

// create pasport local strategy
passport.use(User.createStrategy());

// serialize and deserialize user
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

// register user in database
router.post("/auth/register", async (req, res) => {
    try {
        const registerUser = await User.register({ name: req.body.name }, { email: req.body.email }, { password: req.body.password });
        if (registerUser) {
            passport.authenticate("local")(req, res, function () {
                res.redirect('/home')
            })
        }
        else {
            res.redirect('/register')
        }
    }
    catch (err) {
        res.send(err)
    }
});

// login user
router.post("/auth/login", (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    req.login(user, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            passport.authenticate("local")(req, res, function () {
                res.redirect('/home')
            });
        }
    })
});

// logout
router.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect('/')
});




module.exports = router;