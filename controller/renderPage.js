/**
 * Created by Stijn on 03/07/2017.
 */
const express = require('express'),
    router = express.Router(),
    itembase = require('../model/itembase'),
    sessions = require('../model/sessions'),
    turtlebase = require('../model/turtlebase');

/**
 * Method for rendering a page on the client side.
 */
router.get("/", function (request, response) {
    var cookieString = request.headers.cookie;

    var sessionCookie = parseInt(cookieString.substr(cookieString.indexOf("session=") + 8, cookieString.length));

    sessions.getSession(sessionCookie, function (session) {
        turtlebase.getTurtleIDList(function (turtleList) {
            itembase.getItems('MeInterface', function (items) {
                var renderSpecs;

                console.log(turtleList);

                if (session !== undefined) {
                    renderSpecs = {items: items, validated: session !== undefined, page: session.page, turtleList : turtleList};
                } else {
                    renderSpecs = {validated: session !== undefined, page: 'index'}
                }

                response.render("index.ejs", renderSpecs);
            });
        });
    });
});

module.exports = router;