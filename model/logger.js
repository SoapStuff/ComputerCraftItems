/**
 * Created by Stijn on 01/07/2017.
 */
var logCommands, logRequests, logServer, logItembase, logTurtles, logCSV, logItemmap;

/**
 * Inits the logger based on the passed argument:
 *
 * <none>/'true' The logger logs everything
 * 'turtle' The logger only logs turtle related stuff
 * 'false' The logger logs nothing
 *
 * @param argument The passed argument
 */

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

/**
 * Stops all logging.
 */
module.exports.stopAll = function () {
    logCommands = false;
    logRequests = false;
    logServer = false;
    logItembase = false;
    logTurtles = false;
    logItemmap = false;
    logCSV = false;
};

/**
 * Logs specified string if it should be logged.
 *
 * @param string The string to log (or not to log (that is the question))
 */
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