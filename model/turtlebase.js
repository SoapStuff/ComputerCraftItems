/**
 * Created by Stijn on 01/07/2017.
 */
const logger = require('./logger'),
    Queue = require('../lib/Collections/Queue'),
    validator = require('../lib/validator'),
    Turtle = require('../lib/Turtle'),
    Action = require('../lib/Action');

var turtles;

/**
 * Init function for the turtlebase with an empty array.
 */
module.exports.init = function () {
    turtles = [];
};

/**
 * Adds a new turtle to the turtle array if it is not in the array yet.
 *
 * @param turtleId The id of the new turtle
 * @param callback Calls back after the turtle has been added
 */
module.exports.newTurtle = function (turtleId, callback) {
    var found = false;
    turtleId = parseInt(turtleId);
    var turtle;

    for (var i = 0; i < turtles.length; i++) {
        if (turtles[i].id === turtleId) {
            turtle = turtles[i];
            logger.log("[Turtles] Turtle with id " + turtle.id + " already in database");
            found = true;
            break;
        }
    }

    if (!found) {
        var queue = new Queue();
        turtle = new Turtle(turtleId, queue, []);
        turtles.push(turtle);
        logger.log("[Turtles] New turtle added with id " + turtle.id);
    }

    callback(turtle.id + "");
};

/**
 * Gets the next action of the turtle with the specified id.
 *
 * @param id The id of the turtle
 * @param callback The callback
 */
module.exports.getAction = function (id, callback) {
    getTurtle(id, function (turtle) {
        if (turtle !== undefined) {
            logger.log("[Turtles] Returning next command of turtle with id " + id);
            turtle.hasNextAction(function (hasNext) {
                if (hasNext) {
                    turtle.getNextAction(function (action) {
                        logger.log("[Turtles] Returning action " + action + " to turtle with id " + id);
                        callback(action);
                    });
                } else {
                    logger.log("[Turtles] Turtle with id " + id + " has no next action");
                    callback();
                }
            });
        } else {
            callback();
        }
    });
};

/**
 * Add a new action to the turtle with the specified id.
 *
 * @param id        The id of the turtle
 * @param action    The action to add
 * @param callback  A callback
 */
module.exports.newAction = function (id, action, callback) {
    getTurtle(id, function (turtle) {
        if (turtle !== undefined) {
            turtle.queueAction(new Action(action), function (succes) {
                if (callback !== undefined) {
                    callback(succes);
                }

                return succes;
            });
        } else {
            if (callback !== undefined) {
                callback(false);
            }

            return false;
        }
    });
};

/**
 * Resolve an action that was said to be executed.
 *
 * @param id            The id of the turtle
 * @param actionString  The action
 * @param callback      A callback
 */
module.exports.resolveAction = function (id, actionString, callback) {
    getTurtle(id, function (turtle) {
        turtle.resolveAction(actionString, function (success) {
            callback(success);
        });
    });
};

/**
 * Gets the requested turtle.
 *
 * @param id        The id of the turtle
 * @param callback  A callback
 * @returns {*}     Returns the turtle
 */
var getTurtle = function (id, callback) {
    id = parseInt(id);
    for (var i = 0; i < turtles.length; i++) {
        if (turtles[i].id === id) {
            logger.log("[Turtles] Turtle with id " + id + " found in memory");

            if (callback !== undefined) {
                callback(turtles[i]);
            }

            return turtles[i];
        }
    }
    logger.log("[Turtles] Turtle does not exist in memory");
    callback();
    return undefined;
};

module.exports.getTurtle = getTurtle;

/**
 * Get a list with turtle id's
 *
 * @param callback A callback
 */
module.exports.getTurtleIDList = function (callback) {
    if (turtles.length > 0) {
        var idList = "";
        for (var i = 0; i < turtles.length; i++) {
            idList += turtles[i].id + ",";
        }
        idList = idList.substr(0,idList.length - 1);
        logger.log("[Turtles] Returning ID list " + idList);
        callback(idList)
    } else {
        logger.log("[Turtles] No turtle in memory");
        callback("nil");
    }
};