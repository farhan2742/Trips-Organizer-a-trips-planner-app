const   express     = require('express'),
        router      = express.Router();

// Send Landing Page

router.get('/', (req, res, next) => {
    res.sendFile('dist/index.html' , { root: __dirname + '/../../../' })
});

// Send an not found error

router.get('*', function (req, res) {
    res.send("ERROR404: Page not found")
});

module.exports = router;