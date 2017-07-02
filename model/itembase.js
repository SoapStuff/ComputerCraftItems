/**
 * Created by Stijn on 29/06/2017.
 */
const logger = require('./logger');

var items;

/**
 * Inits the itembase with an item array.
 */
exports.init = function () {
    items =  ["item1","item2","item3","item4","item5"];
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
    items = args.split(",");
    logger.log("[Itembase] Items updated");
};