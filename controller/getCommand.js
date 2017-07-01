/**
 * Created by Stijn on 29/06/2017.
 */
var express = require('express'),
    commandbase = require('../model/commandbase'),
    url = require("url"),
    router = express.Router();

/**
 * Returns the first queued command.
 */
router.get("/", function (request, response) {
    let commands = commandbase.getCommands();

    let command = commands.dequeue();
    // No commands
    if (command === undefined) {
        response.send(responseString({command: "No Commands", args: []}));
        return;
    }

    let string = responseString(command);
    response.send(string)
});

function responseString(command) {
    let argString = "";
    command.args.forEach(function (argument) {
        if (typeof argument === "string") {
            argString += "\"" + argument + "\"";
        } else {
            argString += argument;
        }
        argString += ","
    });
    if(command.args >= 0) {
        argString = argString.substr(0,argString.length-1);
    }
    return '{command = "' + command.command + '" , args = {' + argString + '}}';
}

module.exports = router;