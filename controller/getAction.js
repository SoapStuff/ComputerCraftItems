/**
 * Created by Stijn on 02/07/2017.
 */
const express = require('express'),
    router = express.Router(),
    turtlebase = require('../model/turtlebase');


/**
 * Returns the turtle the next action in its queue.
 */
router.get("/", function (request, response) {
    var query = url.parse(request.url, true).query;
    var id = query.id;

    turtlebase.getAction(id, function (action) {
        if (action !== undefined) {
            response.send(action);
        } else {
            response.send("nil");
        }
    });
});

module.exports = router;