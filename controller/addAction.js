/**
 * Created by Stijn on 02/07/2017.
 */
const express = require('express'),
    router = express.Router(),
    turtlebase = require('../model/turtlebase'),
    url = require('url');


/**
 * Add an action to the turtle action queue.
 */
router.get("/", function (request, response) {
    var query = url.parse(request.url, true).query;
    var id = query.id;
    var action = query.action;

    turtlebase.newAction(id, action, function (success) {
        response.send(success);
    });
});

module.exports = router;