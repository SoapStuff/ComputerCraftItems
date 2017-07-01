/**
 * Created by Arjan on 28-6-2017.
 */
const fs = require("fs");
var blocks = [];
var items = [];

module.exports.init = function(){
    console.log("[CSV-Parser] Loading in files ...");
    var string1 = fs.readFileSync('./resources/block.csv',"utf8");
    var string2 = fs.readFileSync('./resources/item.csv',"utf8");

    console.log("[CSV-Parser] Creating the map ...");
    blocks = string1.split('\n');
    items = string2.split('\n');
};

module.exports.getBlocks = function () {
    return blocks;
};

module.exports.getItems = function () {
    return items;
};