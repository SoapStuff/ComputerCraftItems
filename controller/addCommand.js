/**
 * Created by Stijn on 29/06/2017.
 */
var express = require('express'),
    validate = require('../lib/validator').validate,
    commandbase = require('../model/commandbase'),
    url = require("url"),
    router = express.Router();

/**
 *
 * Executes or enqueues a command.
 *
 */
router.get("/", function(request,response) {
    let query = url.parse(request.url,true).query;
    let commands = commandbase.getCommands();
    let command = commands[query.command];
    let arguments = query.args;

    if(command === undefined || arguments === undefined) {
        response.send("The command was invalid");
        return;
    }

    let args = arguments.split(",");

    if(!validate(query.command,args,response)) {
        return;
    }
    console.log(query.command);
    command.queue.enqueue(args);
    response.send("Command Added");
});

module.exports = router;