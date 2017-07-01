/**
 * Created by Stijn on 29/06/2017.
 */
var express = require('express'),
    validate = require('../lib/validator').validate,
    commandbase = require('../model/commandbase'),
    url = require("url"),
    router = express.Router(),
    itemmap = require("../model/itemmap");

/**
 *
 * Executes or enqueues a command.
 *
 */
router.get("/", function(request,response) {
    let query = url.parse(request.url,true).query;

    if(query.command === undefined || query.args=== undefined) {
        response.send("The command was invalid");
        return;
    }

    let args = query.args.split(",");
    if(!validate(query.command,args,response)) {
        return;
    }
    if(!itemmap.findItem(args)) {
        response.send("Item not found in itemlist");
        return;
    }
    let command = {
        command: query.command,
        args: args
    };

    commandbase.enqueueCommand(command, function () {
        response.send("Command Added");
    });
});

module.exports = router;