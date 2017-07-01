/**
 * Created by Stijn on 01/07/2017.
 */
const logger = require('./logger');

var turtles;

module.exports.init = function() {
    turtles = [];
};

module.exports.newTurtle = function(callback) {
    var turtle = new Turtle();
    turtles.push(turtle);
    logger.log("[Turtles] New turtle added with id " + turtle.id);
    callback("" + turtle.id);
};

function Turtle() {
    this.id = turtles.length;

    return this;
}