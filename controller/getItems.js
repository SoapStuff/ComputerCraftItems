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
    var string = query.string;
    if(string !== undefined) {
        itembase.getItems(function (items) {
            var array = items.filter(function(value){
                return value.indexOf(string) !== -1;
            });
            response.send(array.join(","));
        });
        return
    }
    itembase.getItems(function (items) {
        response.send(items.join(","));
    });
});

module.exports = router;