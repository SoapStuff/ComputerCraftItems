/**
 * Created by Stijn on 01/07/2017.
 */
var logCommands, logRequests, logServer, logItembase;

module.exports.init = function (argument) {
    if (argument !== undefined && argument === 'false') {
        logCommands = false;
        logRequests = false;
        logServer = false;
        logItembase = false;
    } else {
        logCommands = true;
        logRequests = true;
        logServer = true;
        logItembase = true;
    }
};

module.exports.stopAll = function () {
    logCommands = false;
    logRequests = false;
    logServer = false;
    logItembase = false;
};

module.exports.startRequestLog = function () {
    logRequests = true;
};

module.exports.stopRequestLog = function () {
    logRequests = false;
};

module.exports.startCommandLog = function () {
    logCommands = true;
};

module.exports.stopCommandLog = function () {
    logCommands = false;
};

module.exports.startServerLog = function () {
    logServer = true;
};

module.exports.stopServerLog = function () {
    logServer = false;
};

module.exports.startItembaseLog = function () {
    logItembase = true;
};

module.exports.stopItembaseLog = function () {
    logItembase = false;
};

module.exports.log = function (string) {
    if (!logCommands && string.indexOf('Commandbase') !== -1) {
        return;
    }
    if (!logRequests && string.indexOf('Request') !== -1) {
        return;
    }
    if (!logServer && string.indexOf('Server') !== -1) {
        return;
    }
    if (!logItembase && string.indexOf('Itembase') !== -1) {
        return;
    }

    console.log(string);
};