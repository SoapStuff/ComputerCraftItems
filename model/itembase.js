/**
 * Created by Stijn on 29/06/2017.
 */
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
 * @returns {void}
 */
exports.updateItems = function (json) {
    if(json.action === "set" && json.items) {
        network.getInventory(json.inventory).clear();
        network.getInventory(json.inventory).addAll(json.items);
    }
    if(json.action === "update" && json.addItems && json.removeItems && json.updateItems) {
        network.getInventory(json.inventory).addAll(json.addItems);
        network.getInventory(json.inventory).removeAll(json.removeItems);
        network.getInventory(json.inventory).updateAll(json.updateItems);
    }
    logger.log("[Itembase] Items updated");
};

exports.findItemStack = function(inventory,display_name) {
    for(var i = 1; i < display_name.length; i++) {
        if (display_name[i] === '_') {
            display_name = display_name.replace("_"," ");
        }
    }
    return network.getInventory(inventory).contains(new ItemStack(null,0,0,null,display_name,null));
};
