/**
 * Created by Stijn on 29/06/2017.
 */
const express = require("express"),
    router = express.Router(),
    url = require("url"),
    itembase = require('../model/itembase');

/**
 * Method that handles the getItems request made by computers.
 */
router.get("/",function(request,response) {
    var query = url.parse(request.url,true).query;
    var inventory = query.inventory;
    itembase.getItems(inventory,function(items){
        response.send(items.toString())
    })
});

module.exports = router;