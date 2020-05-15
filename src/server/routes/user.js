const   express     = require('express'),
        bodyParser  = require('body-parser'),
        mongoose    = require("mongoose"),
        passport    = require("passport"),
        User        = require("../models/user").User,
        router      = express.Router();


// Authenticate User

router.post("/auth", passport.authenticate("local", {
    successRedirect: "/trips?auth=success",
    failureRedirect: "/?auth=failed"
    }), (req, res, body) => {
});
  
// Register new user

router.post('/user', function (req, res) {
    User.register(new User({
        username: req.body.username,
        email: req.body.email
    }), req.body.password, function(err, user) {
        if (err) {
            console.log(err)
         return res.redirect("/?register=failed")
        }
        passport.authenticate("local")(req,res, function(){
            res.redirect("/?register=success")
        })
    });
});
  

// Send new user registeration form
  
router.get('/user', (req, res) => {
    res.sendFile('dist/register.html' , { root: __dirname + '/../../../' })
});  
  
// Logout an authenticated user

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
});


module.exports = router;
  
  
  
  
  
  
  
  
