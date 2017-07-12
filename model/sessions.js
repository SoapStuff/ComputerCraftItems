/**
 * Created by Stijn on 05/07/2017.
 */
const Session = require('../lib/Session'),
    logger = require('./logger');

var sessions;

/**
 * Init function for the sessionbase.
 */
module.exports.init = function () {
    sessions = [];
};

/**
 * Create a new session.
 *
 * @param callback A callback with the number of the session.
 * @returns {number} Returns the sessionID
 */
module.exports.newSession = function (callback) {
    var sessionNumber = Math.floor((Math.random() * 100000) + 1);

    sessions.push(new Session(sessionNumber));

    if (callback !== undefined) {
        callback(sessionNumber);
    }

    return sessionNumber
};

/**
 * Get a session.
 *
 * @param sessionID The id of the session
 * @param callback A callback with the session as param
 * @returns {*} Returns the session
 */

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