/**
 * Created by Stijn on 01/07/2017.
 */
const logger = require('./logger'),
    Queue = require('../lib/Queue'),
    validator = require('../lib/validator');

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
module.exports.getAction = function(id, callback) {
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
 * The turtle class.
 *
 * @param turtleId The id of the new turtle
 * @param queue The queue of commands for the turtle
 * @param resolving The array that holds action that are in progress
 * @returns {Turtle} Returns the turtle
 * @constructor Constructs a turtle
 */
function Turtle(turtleId, queue, resolving) {
    this.id = turtleId;

    this.queue = queue;
    this.resolving = resolving;

    this.queueAction = function (action, callback) {
        validator.validateAction(action, function (succes) {
            if (succes) {
                logger.log("[Turtles] Action is valid and has been added");
                queue.enqueue(action);
            } else {
                logger.log("[Turtles] Action is invalid");
            }

            if (callback !== undefined) {
                callback(succes);
            }

            return succes;
        });
    };

    this.getNextAction = function (callback) {
        var action = queue.dequeue();
        resolving.push(action);
        action.getActionString(function (actionString) {
            callback(actionString);
        });
    };

    this.resolveAction = function (action, callback) {
        var found = false;
        var resolveArray = this.resolving;

        for (var i = 0; i < resolveArray.length; i++) {
            if (resolveArray[i].equals(action)) {
                found = true;
                resolving = resolveArray.splice(i,1);
                logger.log("[Turtles] Resolved action " + action);
                break;
            }
        }

        if (!found) {
            logger.log("[Turtles] Action not found in array");
        }

        if (callback !== undefined) {
            callback(found);
        }
    };

    this.hasNextAction = function (callback) {
        const hasNext = !queue.isEmpty();

        if (callback !== undefined) {
            callback(hasNext);
        }

        return hasNext;
    };

    return this;
}

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
 * Constructor for an action.
 *
 * @returns {Action}    The newly made action
 * @constructor
 */
function Action(actionString) {
    var description = actionString.split(",")[0];
    var parameterString = actionString.substr(description.length,actionString.length);

    var args = parameterString.split(",");
    args = args.splice(1,args.length);

    var action = actionString;

    logger.log("[Turtles] Created new action with description: " + description);

    this.action = action;
    this.args = args;
    this.description = description;

    this.getActionString = function (callback) {
        if (callback !== undefined) {
            callback(action);
        }

        return action;
    };

    this.equals = function (otherString, callback) {
        const equals = action === otherString;

        if (callback !== undefined) {
            callback(equals);
        }

        if (equals) {
            logger.log("[Turtles] Action " + action + " is equal to " + otherString);
        } else {
            logger.log("[Turtles] Action " + action + " is not equal to " + otherString);
        }

        return equals;
    };

    return this;
}