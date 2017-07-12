/**
 * Created by Stijn on 29/06/2017.
 */
const logger = require('./logger');
const comparator = require('../lib/Comparators/ItemStackComparator').compare;
const BST = require("../lib/Collections/BinarySearchTree");
const ItemStack = require("../lib/ItemStack");

var items;

/**
 * Inits the itembase with an Binary Search Tree
 */
exports.init = function () {
    items =  new BST(comparator);
    var itemStack = new ItemStack("mod_id",0,0,"id","display_name","name");
    items.add(itemStack);
};

/**
 * Returns the items in the system.
 *
 * @param callback A callback
 * @returns {*} An array with items
 */
exports.getItems = function (callback) {
    logger.log("[Itembase] Items requested");
    if (callback) {
        callback(items);
    }

    return items;
};

/**
 * Set the itemarray to a certain new array.
 *
 * @param args The array to set it to.
 */
exports.setItems = function (args) {
    const json = JSON.parse(args);
    if(json.action === "set") {
        var itemsArray = json.items;
        items = new BST(comparator);
        for (var i = 0; i < json.items.length; i++) {
            items.add(json.items[i]);
        }
    }
    logger.log("[Itembase] Items updated");
};