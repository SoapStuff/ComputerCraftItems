/**
 * Created by Stijn on 29/06/2017.
 */
const Queue = require("../lib/Queue.js"),
    logger = require('./logger');

var commands;

exports.init = function () {
    /**
     * export <itemname> <amount> [data-id]
     * import <itemname> <amount> [data-id]
     *
     *
     **/
    commands = new Queue();
};

exports.getCommands = function (callback) {
    logger.log("[Commandbase] Commands requested");
    if (callback) {
        callback(commands);
    }
    return commands;
};

exports.enqueueCommand = function(command, callback) {
    commands.enqueue(command);
    logger.log("[Commandbase] Command enqueued");
    if (callback) {
        callback();
    }
    logger.log("[Commandbase] " + commands.queue);
};