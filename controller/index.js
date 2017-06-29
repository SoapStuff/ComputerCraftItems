/**
 * Created by Stijn on 29/06/2017.
 */
var express = require('express'),
    itembase = require('../model/itembase'),
    router = express.Router();

router.get("", function(request,response) {
    console.log("[Server] Request recieved with url [" + request.url + "]");
    itembase.getItems(function (items) {
        response.render("index.ejs",{items: items});
    });
});

router.use("/getItems", require("./getItems"));
router.use("/sendItems", require("./sendItems"));
router.use("/addCommand", require("./addCommand"));
router.use("/getCommand", require("./getCommand"));

module.exports = router;