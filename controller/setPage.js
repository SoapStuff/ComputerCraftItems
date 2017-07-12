/**
 * Created by Stijn on 05/07/2017.
 */
const express = require('express'),
    router = express.Router(),
    sessions = require('../model/sessions');

/**
 * Set the page to the next page that should be visited.
 */
router.post("/", function (request, response) {
    var cookieString = request.headers.cookie;

    var sessionCookie = parseInt(cookieString.substr(cookieString.indexOf("session=") + 8, cookieString.length));

    sessions.getSession(sessionCookie, function (session) {
        if (session !== undefined) {
            session.setPage(request.body, function () {
                response.json('page set');
            });
        } else {
            response.json('invalid session');
        }
    })
});

module.exports = router;