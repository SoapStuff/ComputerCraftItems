/**
 * Created by Stijn on 01/07/2017.
 */
var logCommands, logRequests, logServer, logItembase, logTurtles, logCSV, logItemmap;

module.exports.init = function (argument) {
    if (argument !== undefined) {
        if (argument === 'false') {
            logCommands = false;
            logRequests = false;
            logServer = false;
            logItembase = false;
            logTurtles = false;
            logItemmap = false;
            logCSV = false;
        }
        if (argument === 'turtle') {
            console.log("[Logger] started in turtle mode");
            logCommands = false;
            logRequests = false;
            logServer = false;
            logItembase = false;
            logTurtles = true;
            logItemmap = false;
            logCSV = false;
        }
        if (argument === 'true') {
            logCommands = false;
            logRequests = false;
            logServer = false;
            logItembase = false;
            logTurtles = false;
            logItemmap = false;
            logCSV = false;
        }
    } else {
        logCommands = true;
        logRequests = true;
        logServer = true;
        logItembase = true;
        logTurtles = true;
        logItemmap = true;
        logCSV = true;
    }
};

module.exports.stopAll = function () {
    logCommands = false;
    logRequests = false;
    logServer = false;
    logItembase = false;
    logTurtles = false;
    logItemmap = false;
    logCSV = false;
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
    if (!logTurtles && string.indexOf('Turtles') !== -1) {
        return;
    }
    if (!logItemmap && string.indexOf('ItemMap') !== -1) {
        return;
    }
    if (!logCSV && string.indexOf('CSV-Parser') !== -1) {
        return;
    }
    console.log(string);
};