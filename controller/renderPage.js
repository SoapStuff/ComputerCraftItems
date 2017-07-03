/**
 * Created by Stijn on 03/07/2017.
 */
const express = require('express'),
    router = express.Router(),
    itembase = require('../model/itembase');


router.get("/", function (request, response) {

    itembase.getItems(function (items) {
        response.render("index.ejs", {items: items});
    });
});

module.exports = router;