/**
 * Created by Stijn on 04/07/2017.
 */
const express = require('express'),
    router = express.Router(),
    sessions = require('../model/sessions');

router.post('/', function (request, response) {
    var details = request.body;

    var validated = details.username === "golem" && details.password === 'Pilmus';

    if (validated) {
        sessions.newSession(function (sessionID) {
            response.json(sessionID);
        })
    } else {
        response.json('failed');
    }
});

module.exports = router;