/**
 * Created by Stijn on 03/07/2017.
 */
const express = require('express'),
    router = express.Router(),
    turtlebase = require('../model/turtlebase');

/**
 * Returns a list with all turtle id's.
 */
router.use("/", function (request, response) {
    turtlebase.getTurtleIDList(function (idList) {
        response.send(idList);
    })
});

module.exports = router;