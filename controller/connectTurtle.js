/**
 * Created by Stijn on 01/07/2017.
 */
const express = require('express'),
    router = express.Router(),
    turtlebase = require('../model/turtlebase'),
    url = require('url');

/**
 * Handles the request made by a turtle.
 */
router.get("/", function (request, response) {
    var query = url.parse(request.url, true).query;
    var id = query.id;

    turtlebase.newTurtle(id, function (id) {
        response.send(id);
    });
});

module.exports = router;