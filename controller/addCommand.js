/**
 * Created by Stijn on 29/06/2017.
 */
const express = require('express'),
    validate = require('../lib/validator').validate,
    commandbase = require('../model/commandbase'),
    url = require("url"),
    router = express.Router(),
    itemmap = require("../model/itemmap");
const Command = require("../lib/Commands/Command");

/**
 *
 * Executes or enqueues a command.
 *
 */
router.post("/", function(request,response) {
    var json = JSON.parse(request.body.json);
    var command;
    try {
        command = new Command(json);
    } catch(error) {
        response.send(error.toString());
        return;
    }
    commandbase.enqueueCommand(command, function () {
        response.send("Command Added");
    });
});

module.exports = router;