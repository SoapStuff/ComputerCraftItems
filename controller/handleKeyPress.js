/**
 * Created by Stijn on 09/07/2017.
 */
const express = require('express' ),
    router = express.Router(),
    sessions = require('../model/sessions'),
    turtlebase = require('../model/turtlebase');

function parseAction(action, turtleID, response) {
    turtlebase.newAction(turtleID, action, function (success) {
        if (!success) {
            response.json('invalid action');
        } else {
            response.json('action added');
        }
    })
}

router.post('/',function (request, response) {
    var cookieString = request.headers.cookie;

    var sessionCookie = parseInt(cookieString.substr(cookieString.indexOf("session=") + 8, cookieString.length));

    sessions.getSession(sessionCookie, function (session) {
        if (session !== undefined) {
            console.log(request.body);
            var action;
            switch (request.body.key) {
                case 'forwardKey':
                    parseAction('moveForward', request.body.id, response);
                    break;
                case 'backKey':
                    parseAction('moveBack', request.body.id, response);
                    break;
                case 'rightKey':
                    parseAction('moveRight', request.body.id, response);
                    break;
                case 'leftKey':
                    parseAction('moveLeft', request.body.id, response);
                    break;
                case 'rotateRight':
                    parseAction('rotateRight', request.body.id, response);
                    break;
                case 'rotateLeft':
                    parseAction('rotateLeft', request.body.id, response);
                    break;
                case 'upKey':
                    parseAction('moveUp', request.body.id, response);
                    break;
                case 'downKey':
                    parseAction('moveDown', request.body.id, response);
                    break;
                case 'useKey':
                    response.json('unsupported action WIP');
                    break;
                default:
                    response.json('invalid action');
                    break;
            }
        } else {
            response.json('invalid session');
        }
    });
});

module.exports = router;