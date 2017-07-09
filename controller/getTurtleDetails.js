/**
 * Created by Stijn on 07/07/2017.
 */
const express = require('express'),
    router = express.Router(),
    sessions = require('../model/sessions'),
    turtlebase = require('../model/turtlebase'),
    panelBuilder = require('../lib/panelBuilder'),
    logger = require('../model/logger');

router.post('/', function (request, response) {
    var cookieString = request.headers.cookie;

    var sessionCookie = parseInt(cookieString.substr(cookieString.indexOf("session=") + 8, cookieString.length));

    sessions.getSession(sessionCookie, function (session) {
        if (session !== undefined) {
            turtlebase.getTurtle(request.body.selected, function (turtle) {
                panelBuilder.buildTurtlePanel(turtle, function (panel) {
                    logger.log("[Panelbuilder] Sending panel:");
                    console.log(panel);
                    response.json(panel);
                })
            })
        } else {
            response.json('failed');
        }
    })
});

module.exports = router;
