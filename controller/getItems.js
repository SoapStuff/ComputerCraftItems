/**
 * Created by Stijn on 29/06/2017.
 */
var express = require("express"),
    router = express.Router(),
    url = require("url"),
    itembase = require('../model/itembase');

router.get("/",function(request,response) {
    let query = url.parse(request.url,true).query;
    let string = query.string;
    console.log("reached");
    if(string !== undefined) {
        itembase.getItems(function (items) {
            let array = items.filter(function(value){
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