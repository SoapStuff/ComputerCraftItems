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
        itembase.updateItems(JSON.parse(request.body.json), function(network,inventory) {
            if(!network.isInitialized(inventory)) {
                network.setInitialized(inventory);
                response.send("Request Items");
            } else {
                response.send("Items Updated");
            }
        });
    }
});

module.exports = router;