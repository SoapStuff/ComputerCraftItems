/**
 * Created by Stijn on 01/07/2017.
 */
const logger = require('./logger'),
    Queue = require('../lib/Queue');

var turtles;

/**
 * Inits the turtlebase with an empty array.
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
        turtle = new Turtle(turtleId, queue);
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
    id = parseInt(id);
    for (var i = 0; i < turtles.length; i++) {
        if (turtles[i].id === id) {
            const turtle = turtles[i];
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
            return;
        }
    }
};

/**
 * The turtle class.
 *
 * @param turtleId The id of the new turtle
 * @param queue The queue of commands for the turtle
 * @returns {Turtle} Returns the turtle
 * @constructor Constructs a turtle
 */
function Turtle(turtleId, queue) {
    this.id = turtleId;

    this.queue = queue;

    this.queueAction = function (action) {
        queue.enqueue(action);
    };

    this.getNextAction = function (callback) {
        var action = queue.dequeue();
        callback(action);
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