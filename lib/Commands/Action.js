/**
 * Created by Stijn on 02/07/2017.
 */
const logger = require('../../model/logger'),
    validator = require('../Helpers/validator');

/**
 * Constructor for an action.
 *
 * @returns {Action}    The newly made action
 * @constructor
 */
module.exports = function Action(actionString) {
    var description = actionString.split(",")[0];
    var parameterString = actionString.substr(description.length, actionString.length);

    var args = parameterString.split(",");
    args = args.splice(1, args.length);

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
};