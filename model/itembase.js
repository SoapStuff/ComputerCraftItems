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
exports.updateItems = function (args) {
    const json = JSON.parse(args);
    if(json.action === "set" && json.items) {
        setItems(json.items)
    }
    if(json.action === "update" && json.addItems && json.removeItems && json.updateItems) {
        updateItems(json.addItems, json.removeItems, json.updateItems)
    }
    logger.log("[Itembase] Items updated");
};

function updateItems(addItems,removeItems,updateItems) {

    //updateItems
    for(var i = 0; i < updateItems.length; i++) {
        var item = items.contains(updateItems[i])
        if (item !== null) {
            item.qty = updateItems[i].qty;
        }
    }

    //Remove the items
    for(var i = 0; i < removeItems.length; i++) {
        items.remove(removeItems[i]);
    }

    // Add the items
    for (var i = 0; i < addItems.length; i++) {
        items.add(addItems[i]);
    }
}

function setItems(_items)  {
    items = new BST(comparator);
    for (var i = 0; i < _items.length; i++) {
        items.add(_items[i]);
    }
}
