/**
 * Created by Arjan on 14-7-2017.
 * This holds information about one item network.
 */
require("./ItemStack");
const Inventory = require("./Inventory");

function Network(id) {
    this.id = id;
    this.meInterface = new Inventory();
    this.enderChest = new Inventory();
}

Network.prototype.constructor = Network;

Network.prototype.getInventory = function(inventory) {
    switch (inventory.toLowerCase()) {
        case "enderchest": return this.enderChest;
        case "meinterface": return this.meInterface;
        default: return this.meInterface;
    }
};

Network.prototype.getEnderChest = function() {
    return this.enderChest;
};

Network.prototype.getMeInterface = function () {
    return this.meInterface
};

Network.prototype.getId = function() {
    return this.id;
};

module.exports = Network;