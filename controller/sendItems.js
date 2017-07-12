/**
 * Created by Stijn on 29/06/2017.
 */
const express = require("express"),
    router = express.Router(),
    itembase = require('../model/itembase');

/**
 * Method that handles the post request that sends the items in the system to the server.
 */
router.post("/", function(request,response) {
    if(request.body) {
        itembase.updateItems(request.body.request);
        response.send("Items added");
    }
});

module.exports = router;