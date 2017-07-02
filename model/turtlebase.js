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

    this.hasNextAction = function () {
        return !queue.isEmpty();
    };

    return this;
}