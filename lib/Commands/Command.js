/**
 * Created by Arjan on 17-7-2017.
 */
const itembase = require("../../model/itembase");

/**
 *
 * @param command the command
 * @constructor
 */
function Command(json) {
    var command = this.invariant(json);

    this.command = command.command;
    this.itemid = command.itemid;
    this.amount = command.amount;
    this.dmg = command.dmg;
}

Command.prototype.constructor = Command;
/**
 * Checks whether the state of the command is right;
 * @method invariant
 * @returns The valid command or undefined.
 */
Command.prototype.invariant = function(json) {
    var command = json.command;
    var commands = {
        "import": "EnderChest",
        "export": "MeInterface",
        "craft": "MeInterface"
    };
    var error = "Invalid Argument Exception : ";
    if (commands[command] === undefined) {
        throw new Error(error + "Invalid Command");
    }
    var inventory = commands[command];
    var valid = json.item !== undefined && typeof json.item === "string";
    if(!valid) {
        throw new Error(error + "Invalid Item Name");
    }
    var itemStack = itembase.findItemStack(inventory,json.item);
    // If item not found we still want to add the command but let it fail on the client side.
    // if(itemStack === null && json.item !== "all") {
    //     throw new Error(error + "Item was not found");
    // }
    var itemid = itemStack !== null ? itemStack.id : json.item;
    var amount = json.amount !== undefined && !isNaN(parseInt(json.amount))? parseInt(json.amount) : 64;
    var dmg = json.dmg !== undefined && !isNaN(parseInt(json.dmg))? parseInt(json.dmg) : -1;
    return {command: command, itemid: itemid, amount: amount, dmg: dmg};
};
module.exports = Command;

