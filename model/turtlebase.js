/**
 * Created by Stijn on 01/07/2017.
 */
const logger = require('./logger'),
    Queue = require('../lib/Queue');

var turtles;

module.exports.init = function () {
    turtles = [];
};

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

    callback("" + turtle.id);
};

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