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
    let args = query.args;

    if(command === undefined || arguments === undefined) {
        response.send("The command was invalid");
        return;
    }

    args = args.split(",");

    if(!validate(query.command,args,response)) {
        return;
    }
    commandbase.enqueueCommand(args, function () {
        response.send("Command Added");
    });
});

module.exports = router;