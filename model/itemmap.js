/**
 * Created by Arjan on 30-6-2017.
 */

const BST = require("../lib/BinarySearchTree");
const CSV = require("../lib/CSV-Parser");
const fs = require("fs");
/*
 * A map for all the items in the
 */
const map = {
    minecraft: new BST()
};

insert = function (item) {
    var completeName = item.split(',')[0];
    var index = completeName.indexOf(":");
    var modName = completeName.substr(0, index);
    var itemName = completeName.substr(index + 1);
    if (modName && itemName) {
        console.log("[ItemMap]" + completeName + " has been inserted into the map");
        if (map[modName] === undefined) {
            map[modName] = new BST();
        }
        map[modName].add(itemName);
    }
};

module.exports.init = function () {
    CSV.init();
    var blocks = CSV.getBlocks();
    var items = CSV.getItems();
    items.forEach(insert);
    blocks.forEach(insert);
    fs.writeFile("myJson",JSON.stringify(map["minecraft"]),null,2);
};

/**
 * Returns true if the item is found.
 * Also modifies the string to the complete itemname.
 */
module.exports.findItem = function (args) {
    var item = args[0];
    // We want to continue of we don't care which item it is.
    if(item === "all") return true;
    console.log("[ItempMap] trying to find " + item);
    var index = item.indexOf(":");
    if (index >= 0) {
        var modName = item.substr(0, index);
        var itemName = item.substr(index + 1);
        if(map[modName] === undefined) {
            return false;
        }
        console.log("[ItemMap] trying to find " + itemName + " in " + modName);
        return map[modName].contains(itemName);
    } else {
        for (var modName in map) {
            console.log("[ItemMap] trying to find " + item + " in " + modName);
            if (map[modName].contains(item)) {
                // Change the itemname to the complete itemname
                args[0] = modName + ":" + item;
                return true;
            }
        }
        return false;
    }
};