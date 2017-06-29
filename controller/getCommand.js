/**
 * Created by Stijn on 29/06/2017.
 */
var express = require('express'),
    validate = require('../lib/validator').validate,
    commandbase = require('../model/commandbase'),
    url = require("url"),
    router = express.Router();

/**
 * Returns the first queued command.
 */
router.get("/", function(request,response) {
    let query = url.parse(request.url,true).query;
    let command = commands[query.command];

    if(command !== undefined) {
        let arguments = command.queue.dequeue();
        if(arguments === undefined) {
            response.send(responseString("No Commands",[]));
            return;
        }

        let string = responseString(query.command,arguments);
        response.send(string)
    } else {
        response.send(responseString("Invalid Command",[]))
    }
});

function responseString(command,arguments) {
    let argString = arguments.join(",");
    return '{command = "' + command + '" , args = {' + argString + '}}';
}

module.exports = router;