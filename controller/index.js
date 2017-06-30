/**
 * Created by Stijn on 29/06/2017.
 */
var express = require('express'),
    itembase = require('../model/itembase'),
    router = express.Router();

router.use(function (request, response, next) {
    console.log("[Request] " + request.method + " " + request.url);
    if (request.method === "GET" && request.url === "/") {
        itembase.getItems(function (items) {
            response.render("index.ejs", {items: items});
        });
    }
    next();
});


router.use("/getItems", require("./getItems"));
router.use("/sendItems", require("./sendItems"));
router.use("/addCommand", require("./addCommand"));
router.use("/getCommand", require("./getCommand"));

module.exports = router;