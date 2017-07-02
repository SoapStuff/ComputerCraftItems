/**
 * Created by Stijn on 29/06/2017.
 */
var validateSendItems;
var validateExport;
var validateImport;
var validateCrafting;
var validate;

/**
 * Calls all validate methods to validate the given commands.
 *
 * @param command The command to check
 * @param args The arguments of the command
 * @param response The response reference for responding to client
 * @returns {*} If the command is valid
 */
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
 * Validate the sendItems command
 *
 * TODO give it content?
 * @param args The arguments of the command
 * @param response The response reference
 * @returns {boolean} If the command is valid
 */
validateSendItems = function(args,response) {
    return true;
};

/**
 * Validate the export command.
 * <String itemName> [int amount] [int data || 'all' || -1]
 *
 * @param args
 * @param response
 */
validateExport = function(args,response) {
    var length = args.length;
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
 *
 * @param args
 * @param response
 */
validateImport = function(args,response) {
    var length = args.length;
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

/**
 * Validate the crafting command.
 *  *
 * @param args
 * @param response
 * @returns {boolean}
 */
validateCrafting = function(args,response) {
    var length = args.length;
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
