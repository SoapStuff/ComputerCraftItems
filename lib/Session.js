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

    this.setPage = function (pageName) {
        this.page = pageName;
    };
};