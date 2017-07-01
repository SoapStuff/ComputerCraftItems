/**
 * Created by Stijn on 01/07/2017.
 */
const express = require('express'),
    router = express.Router(),
    turtlebase = require('../model/turtlebase');

router.get("/", function (request, response) {
    turtlebase.newTurtle(function (id) {
        response.send(id);
    });
});

module.exports = router;