/**
 * Created by Stijn on 29/06/2017.
 */
var items;

exports.init = function () {
    items =  ["item1","item2","item3","item4","item5"];
};

exports.getItems = function (callback) {
    console.log("[Itembase] Items requested");
    if (callback) {
        callback(items);
    }

    return items;
};