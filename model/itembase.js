/**
 * Created by Stijn on 29/06/2017.
 */
const logger = require('./logger');

var items;

exports.init = function () {
    items =  ["item1","item2","item3","item4","item5"];
};

exports.getItems = function (callback) {
    logger.log("[Itembase] Items requested");
    if (callback) {
        callback(items);
    }

    return items;
};

exports.setItems = function (args) {
    logger.log("[Itembase] Items updated");
    items = args.split(",");
};