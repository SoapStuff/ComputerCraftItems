/**
 * Created by Stijn on 29/06/2017.
 */
const express = require('express'),
    commandbase = require('../model/commandbase'),
    url = require("url"),
    router = express.Router();
const logger = require("../model/logger");
const serializeToLua = require("../lib/Lua").serializeToLuaTable;

/**
 * Returns the first queued command.
 */
router.get("/", function (request, response) {
    var commands = commandbase.getCommands();

    var command = commands.dequeue();
    // No commands
    if (command === undefined) {
        response.send("nil");
        return;
    }

    var string = serializeToLua(command);
    logger.log("[GetCommand]" + string);
    response.send(string)
});

/**
 * Method that creates a response string from a given command
 * @param command The command to turn into a string
 * @returns {string} The response string
 * @deprecated
 */
function responseString(command) {
    var argString = "{";

    for (var k in command){
        if (command.hasOwnProperty(k)) {
            argString += k + " = ";
            var value = command[k];
            if (typeof value === "string") {
                argString += "\"" + value + "\"";
            } else {
                argString += value;
            }
            argString += ","
        }
    }
    argString = argString.substr(0,argString.length-1) + "}";
    return argString;
}

module.exports = router;