/**
 * Created by Stijn on 29/06/2017.
 */
var express = require("express"),
    router = express.Router(),
    itembase = require('../model/itembase');

router.post("/", function(request,response) {
    if(request.body.args) {
        itembase.getItems(function (items) {
            items = request.body.args.split(",");
            response.send("Items added")
        });
    }
});

module.exports = router;