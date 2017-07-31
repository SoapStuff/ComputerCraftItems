/**
 * Created by Stijn on 02/07/2017.
 */
const logger = require('../model/logger'),
    validator = require('./Helpers/validator');
/**
 * The turtle class.
 *
 * @param turtleId The id of the new turtle
 * @param queue The queue of commands for the turtle
 * @param resolving The array that holds action that are in progress
 * @returns {Turtle} Returns the turtle
 * @constructor Constructs a turtle
 */
module.exports = function Turtle(turtleId, queue, resolving) {
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
};