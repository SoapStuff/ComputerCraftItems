/**
 * Created by Arjan on 14-7-2017.
 */

const BST = require("../Collections/BinarySearchTree");
const Comparator = require("../Comparators/ItemStackComparator").compare;
const ItemStack = require("./ItemStack");

/**
 * New Inventory (Binary Search Tree of ItemStacks)
 * @class Inventory
 * @constructor
 */
function Inventory() {
    this.itemStacks = new BST(Comparator);
    for(var i = 0; i < arguments.length; i++) {
        var itemStack = ItemStack.cast(arguments[i]);
        if(itemStack instanceof ItemStack) {
            this.itemStacks.add(itemStack);
        }
    }
}

Inventory.prototype.constructor = Inventory;

/**
 * Add item to inventory
 * @param {ItemStack} itemStack
 */
Inventory.prototype.add = function(itemStack) {
    if(!(itemStack instanceof ItemStack)) {
        itemStack = ItemStack.cast(itemStack);
    }
    this.itemStacks.add(itemStack);
};

/**
 * Remove an ItemStack from the Inventory
 * @param {ItemStack} itemStack
 */
Inventory.prototype.remove = function(itemStack) {
    if(!(itemStack instanceof ItemStack)) {
        itemStack = ItemStack.cast(itemStack);
    }
    this.itemStacks.remove(itemStack);
};

/**
 * Returns the itemStack contained in the Inventory
 * @param itemStack
 * @returns {*|ItemStack}
 */
Inventory.prototype.contains = function(itemStack) {
    if(!(itemStack instanceof ItemStack)) {
        itemStack = ItemStack.cast(itemStack);
    }
    return this.itemStacks.contains(itemStack);
};

/**
 * Updates the itemStack
 * @param {ItemStack} itemStack
 */
Inventory.prototype.update = function(itemStack) {
    if(!(itemStack instanceof ItemStack)) {
        itemStack = ItemStack.cast(itemStack);
    }
    var foundItemStack = this.contains(itemStack);
    if (foundItemStack !== null) {
        foundItemStack.qty = itemStack.qty;
    }
};

/**
 * Returns an array representation of the Inventory
 * @returns {*|Array}
 */
Inventory.prototype.getItems = function() {
    return this.itemStacks.toArray();
};

/**
 * Adds the array of items
 * @param {Array} itemStacks
 */
Inventory.prototype.addAll = function(itemStacks) {
    for(var i = 0; i < itemStacks.length; i++) {
        this.add(itemStacks[i]);
    }
};

/**
 * Removes the array of items
 * @param {Array} itemStacks
 */
Inventory.prototype.removeAll = function(itemStacks) {
    for(var i = 0; i < itemStacks.length; i++) {
        this.remove(itemStacks[i]);
    }
};

/**
 * The items to update.
 * @param {Array} itemStacks
 */
Inventory.prototype.updateAll = function(itemStacks) {
    for(var i = 0; i < itemStacks.length; i++) {
        this.update(itemStacks[i]);
    }
};

/**
 *
 */
Inventory.prototype.clear = function() {
    this.itemStacks = new BST(Comparator)
};

/**
 * To String
 * @returns {*|String}
 */
Inventory.prototype.toString = function () {
    return this.itemStacks.toString();
};

module.exports = Inventory;