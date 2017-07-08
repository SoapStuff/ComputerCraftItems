/**
 * Created by Stijn on 29/06/2017.
 */
const logger = require('./logger');
const comparator = require('../lib/StringComparator');
const BST = require("../lib/BinarySearchTree");

var items;

/**
 * Inits the itembase with an item array.
 */
exports.init = function () {
    items =  ["Item1","Item2","Item3"];
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
        items = json.items;
    }
    logger.log("[Itembase] Items updated");
};