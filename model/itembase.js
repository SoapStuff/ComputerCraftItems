/**
 * Created by Stijn on 29/06/2017.
 */

/** @namespace json.itemlist */
/** @namespace json.command */
const logger = require('./logger');
const ItemStack = require("../lib/Items/ItemStack");
const Network = require("../lib/Items/Network");
const Inventory = require("../lib/Items/Inventory");
var network;

/**
 * Inits the itembase with an Binary Search Tree
 */
exports.init = function () {
    network = new Network(1);
    var itemStack = new ItemStack("mod_id",0,0,"id","display_name","name");
    network.getInventory("MeInterface").add(itemStack);
};

/**
 * Returns the inventory in the system.
 *
 * @param callback A callback
 * @param inventory <MeInterface or EnderChest>
 * @returns {*} An array with inventory
 */
exports.getItems = function (inventory,callback) {
    logger.log("[Itembase] Items requested");
    if (callback) {
        callback(network.getInventory(inventory));
    }

    return network.getInventory(inventory);
};

/**
 * Update the Inventory accordingly.
 * @param json The array to set it to.
 * @param {function} [callback] The callback
 * @returns {void}
 */
exports.updateItems = function (json,callback) {
    logger.log("[Itembase] updateItems:" + JSON.stringify(json,function(key,value) {
        return key ==="itemlist" ? value.length : value;
    }));
    //{ command: <clear|add|remove|update>, itemlist: [<ItemStack>.....], inventory: <meinterface,enderchest>}
    if(json.command !== "clear" && (!json.inventory || !json.itemlist)) {
        throw new Error("Invalid Request" + JSON.stringify(json));
    }
    switch (json.command) {
        case "clear": network.getInventory(json.inventory).clear(); break;
        case "add": network.getInventory(json.inventory).addAll(json.itemlist); break;
        case "remove": network.getInventory(json.inventory).removeAll(json.itemlist); break;
        case "update": network.getInventory(json.inventory).updateAll(json.itemlist); break;
    }
    logger.log("[Itembase] Items updated");
    if(callback) {
        callback(network,json.inventory);
    }
};

exports.findItemStack = function(inventory,display_name) {
    for(var i = 1; i < display_name.length; i++) {
        if (display_name[i] === '_') {
            display_name = display_name.replace("_"," ");
        }
    }
    return network.getInventory(inventory).contains(new ItemStack(null,0,0,null,display_name,null));
};
