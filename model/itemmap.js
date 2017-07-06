/**
 * Created by Arjan on 30-6-2017.
 */

const BST = require("../lib/BinarySearchTree");
const CSV = require("../lib/CSV-Parser");
const fs = require("fs");
const logger = require('./logger');
const comparator = require("../lib/StringComparator").compare;
/*
 * A map for all the items in the
 */
const map = {
    minecraft: new BST(comparator)
};

/**
 * Insert an item in the search tree.
 *
 * @param item The item to insert
 */
insert = function (item) {
    var completeName = item.split(',')[0];
    var index = completeName.indexOf(":");
    var modName = completeName.substr(0, index);
    var itemName = completeName.substr(index + 1);
    if (modName && itemName) {
        logger.log("[ItemMap]" + completeName + " has been inserted into the map");
        if (map[modName] === undefined) {
            map[modName] = new BST(comparator);
        }
        map[modName].add(itemName);
    }
};

/**
 * Inits the itemmap with the required content.
 */
module.exports.init = function () {
    CSV.init();
    var blocks = CSV.getBlocks();
    var items = CSV.getItems();
    items.forEach(insert);
    blocks.forEach(insert);
};

/**
 * Returns the complete itemName of the found item.
 * Returns null if it is not found;
 */
module.exports.findItem = function (item) {
    var foundObject, modName;
    if(!(typeof item === "string")) return null;

    var index = item.indexOf(":");
    logger.log("[ItempMap] trying to find " + item);
    // If index >= 0 then modname is known.
    if (index >= 0) {
        modName = item.substr(0, index);
        var itemName = item.substr(index + 1);
        if(map[modName] === undefined) {
            return null;
        }
        logger.log("[ItemMap] trying to find " + itemName + " in " + modName);
        foundObject = map[modName].contains(itemName);
    } else {
        //Search in all mods for the item.
        for (var mod in map) {
            logger.log("[ItemMap] trying to find " + item + " in " + mod);
            foundObject = map[mod].contains(item);
            if(foundObject) {
                modName = mod;
                break;
            }
        }
    }
    if(foundObject) {
        return modName + ":" + foundObject;
    }
    return null;
};