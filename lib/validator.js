/**
 * Created by Stijn on 29/06/2017.
 */
var validateSendItems;
var validateExport;
var validateImport;
var validateCrafting;
var validate;

validate = function(command,args,response) {
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
};

/**
 * Validate send items command
 * List of itemnames, ids & amounts
 */
validateSendItems = function(args,response) {
    return true;
};

/**
 * Validate the export command
 * <String itemName> [int amount] [int data || 'all' || -1]
 * @param args
 * @param response
 */
validateExport = function(args,response) {
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
};

/**
 * Validate the import argument
 * [String: itemName default: 'all'] [int: amount] [int: data || all || -1]
 * @param args
 * @param response
 */
validateImport = function(args,response) {
    let length = args.length;
    if(length === 0) {
        response.send("No itemName specified");
        return false;
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
};

validateCrafting = function(args,response) {
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
};

exports.validateSendItems = validateSendItems;
exports.validateExport = validateExport;
exports.validateImport = validateImport;
exports.validateCrafting = validateCrafting;
exports.validate = validate;
