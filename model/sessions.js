/**
 * Created by Stijn on 05/07/2017.
 */
const Session = require('../lib/Session'),
    logger = require('./logger');

var sessions;

module.exports.init = function () {
    sessions = [];
};

module.exports.newSession = function (callback) {
    var sessionNumber = Math.floor((Math.random() * 100000) + 1);

    sessions.push(new Session(sessionNumber));

    if (callback !== undefined) {
        callback(sessionNumber);
    }

    return sessionNumber
};

module.exports.getSession = function (sessionID, callback) {
    var session;

    for (var i = 0; i < sessions.length; i++) {
        if (sessions[i].sessionID === sessionID) {
            session = sessions[i];
            logger.log("[Sessions] Session found with id " + sessionID);
            break;
        }
    }

    if (session === undefined) {
        logger.log("[Sessions] Session with id " + sessionID + " not found");
    }

    if (callback !== undefined) {
        callback(session);
    }

    return session;
};