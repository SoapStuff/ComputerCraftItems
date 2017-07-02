/**
 * Created by Stijn on 29/06/2017.
 */
const express = require('express'),
    itembase = require('../model/itembase'),
    router = express.Router(),
    logger = require('../model/logger');

/**
 * Prints the request made when a request is made and returns a webpage if it is the default request.
 */
router.use(function (request, response, next) {
    logger.log("[Request] " + request.method + " " + request.url);
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
router.use("/connectTurtle", require('./connectTurtle'));

module.exports = router;