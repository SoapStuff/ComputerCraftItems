/**
 * Created by Stijn on 05/07/2017.
 */
const logger = require('../model/logger');

module.exports = function Session(sessionNumber) {
    var sessionID = sessionNumber;
    var page = 'index';

    this.sessionID = sessionID;

    this.page = page;

    this.getSessionNumber = function () {
        return sessionID;
    };

    this.setPage = function (pageObject, callback) {
        var pageName = pageObject.page;

        this.page = pageName;

        logger.log("[Sessions] Page of session " + sessionID + " set to " + pageName);

        if (callback !== undefined) {
            callback();
        }
    };
};