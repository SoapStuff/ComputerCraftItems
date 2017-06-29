/**
 * Created by Arjan on 23-6-2017.
 */
const express = require("express");
const http = require("http");
const url = require("url");
const bodyParser = require("body-parser");
const app = express();
const port = process.argv[2];
const Queue = require("./DataStructure/Queue.js");


app.set('view engine', 'ejs');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

http.createServer(app).listen(port);

/**
 * export <itemname> <amount> [data-id]
 * import <itemname> <amount> [data-id]
 *
 *
 **/
const commands = {
    export : {
        queue: new Queue()
    },
    import : {
        queue: new Queue()
    },
    craft : {
        queue: new Queue()
    }
};

let items = ["item1","item2","item3","item4","item5"];

/** Validate all the command requests assumes the command is already valid**/
function validate(command,args,response) {
    // Make sure all commands are valid
    if(command === "import") {
        return validateImport(args,response);
    }
    else if(command === "export") {
        return validateExport(args,response);
    } else if (command === "craft") {
        return validateCrafting(args,response);
    }
    return true;
}

function validateCrafting(args,response) {
    let length = args.length;
    if(length <= 1) {
        response.send("Invalid crafting request");
        return false;
    }
    if(length === 2) {
        args.push(0);
    }
    if(!(typeof args[0] === "string")) {
        response.send("Invalid item name");
        return false;
    }
    if( (isNaN(args[1]) && isNaN(parseInt(args[1]))) || args[1] < 1) {
        response.send("Invalid amount");
        return false;
    }
    if( (isNaN(args[2]) && isNaN(parseInt(args[2])))) {
        response.send("Invalid data-id");
        return false;
    }
    return true;
}

/**
 * Validate send items command
 * List of itemnames, ids & amounts
 */
function validateSendItems(args,response) {
    return true;
}

/**
 * Validate the export command
 * <String itemName> [int amount] [int data || 'all' || -1]
 * @param args
 * @param response
 */
function validateExport(args,response) {
    let length = args.length;
    if(length === 0) {
        response.send("The command was invalid");
        return false;
    }
    if(length === 1) {
        args[1] = 1;
        args[2] = -1;
    }
    if(length === 2) {
        args[2] = -1;
    }
    if(!(typeof args[0] === "string")) {
        response.send("Invalid item name");
        return false;
    }
    if( (isNaN(args[1]) && isNaN(parseInt(args[1]))) || args[1] < 1) {
        response.send("Invalid amount");
        return false;
    }
    if( isNaN(args[2]) && isNaN(parseInt(args[2])) && args[2] !== 'all') {
        response.send("Invalid data token");
        return false;
    }
    if (args[2] === 'all') {
        args[2] = -1;
    }
    return true;
}
/**
 * Validate the import argument
 * [String: itemName default: 'all'] [int: amount] [int: data || all || -1]
 * @param args
 * @param response
 */
function validateImport(args,response) {
    let length = args.length;
    if(length === 0) {
        args[0] = '"all"';
        args[1] = 1;
        args[2] = -1
    }
    if (length === 1) {
        args[1] = 1;
        args[2] = -1
    }
    if (length === 2) {
        args[2] = -1;
    }
    if(!(typeof args[0] === "string")) {
        response.send("Invalid item name");
        return false;
    }
    if( ((isNaN(args[1]) && isNaN(parseInt(args[1]))) || args[1] < 1) && args[0] !== "all") {
        response.send("Invalid amount");
        return false;
    }
    if( isNaN(args[2]) && isNaN(parseInt(args[2])) && args[2] !=='all') {
        response.send("Invalid data token");
        return false;
    }
    if (args[2] === 'all') {
        args[2] = -1;
    }
    return true;
}

/**
 *
 * Executes or enqueues a command.
 *
 */
app.get("/addCommand", function(request,response) {
    let query = url.parse(request.url,true).query;
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

app.post("/sendItems", function(request,response) {
    if(request.body.args) {
        items = request.body.args.split(",");
    }
    response.send("Items added")
});

/**
 * Returns the first queued command.
 */
app.get("/getCommand", function(request,response) {
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

app.get("/getItems",function(request,response) {
    let query = url.parse(request.url,true).query;
    let string = query.string;
    if(string !== undefined) {
        let array = items.filter(function(value){
            return value.indexOf(string) !== -1;
        });
        response.send(array.join(","));
        return
    }
    response.send(items.join(","));
});

app.get("",function(request,response) {
    response.render("Web/Pages/index.ejs",{items: items});
});