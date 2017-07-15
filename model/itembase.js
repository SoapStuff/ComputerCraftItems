/**
 * Created by Stijn on 29/06/2017.
 */
const logger = require('./logger');
const comparator = require('../lib/Comparators/ItemStackComparator').compare;
const BST = require("../lib/Collections/BinarySearchTree");
const ItemStack = require("../lib/Items/ItemStack");
const Inventory = require("../lib/Items/Inventory");

var inventory;

/**
 * Inits the itembase with an Binary Search Tree
 */
exports.init = function () {
    inventory =  new Inventory();
    var itemStack = new ItemStack("mod_id",0,0,"id","display_name","name");
    inventory.add(itemStack);
};

/**
 * Returns the inventory in the system.
 *
 * @param callback A callback
 * @returns {*} An array with inventory
 */
exports.getItems = function (callback) {
    logger.log("[Itembase] Items requested");
    if (callback) {
        callback(inventory);
    }

    return inventory;
};

/**
 * Update the Inventory accordingly.
 * @param args The array to set it to.
 * @returns {void}
 */
exports.updateItems = function (args) {
    const json = JSON.parse(args);
    if(json.action === "set" && json.items) {
        inventory = new Inventory();
        inventory.addAll(json.items);
    }
    if(json.action === "update" && json.addItems && json.removeItems && json.updateItems) {
        inventory.addAll(json.addItems);
        inventory.removeAll(json.removeItems);
        inventory.updateAll(json.updateItems);
    }
    logger.log("[Itembase] Items updated");
};
