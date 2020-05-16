const   express     = require('express'),
        mongoose    = require("mongoose"),
        passport    = require("passport"),
        router      = express.Router({mergeParams: true});

// Send Landing Page

router.get('/' ,(req, res) => {
    if(req.isAuthenticated()){
        res.sendFile('dist/trips.html', { root: __dirname + '/../../../' })
    }
    else{
        res.sendFile('dist/landing.html' , { root: __dirname + '/../../../' })
    }
});

// Send an not found error

router.get('*', function (req, res) {
    res.send("ERROR404: Page not found")
});

module.exports = router;