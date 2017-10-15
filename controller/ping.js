/**
 * Ping the server.
 */
const express = require("express"),
    router = express.Router(),
    url = require("url"),
    itembase = require('../model/itembase');

/**
 * Pong!
 */
router.get("/",function(request,response) {
    response.send("Pong!");
});

module.exports = router;