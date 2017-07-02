/**
 * Created by Stijn on 02/07/2017.
 */
const express = require('express'),
    router = express.Router(),
    turtlebase = require('../model/turtlebase'),
    url = require('url');


/**
 * Resolves the action send.
 */
router.get("/", function (request, response) {
    var query = url.parse(request.url, true).query;
    var id = query.id;
    var action = query.action;

    turtlebase.resolveAction(id, action, function (success) {
        response.send(success + "");
    });
});

module.exports = router;