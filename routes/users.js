var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
            /*
        fs.writeFile("test.json", JSON.stringify(payload), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
        */
});

module.exports = router;