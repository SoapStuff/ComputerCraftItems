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
    this.itemStacks = new BST(Comparator)
    for(var argument in arguments) {
        if(argument instanceof ItemStack) {
            this.itemStacks.add(argument);
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
        throw new Error("Invalid Argument Exception: Item is not instance of itemStack");
    }
    this.itemStacks.add(itemStack);
};

/**
 * Remove an ItemStack from the Inventory
 * @param {ItemStack} itemStack
 */
Inventory.prototype.remove = function(itemStack) {
    if(!(itemStack instanceof ItemStack)) {
        throw new Error("Invalid Argument Exception: Item is not instance of itemStack");
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
        throw new Error("Invalid Argument Exception: Item is not instance of itemStack");
    }
    return this.itemStacks.contains(itemStack);
};

/**
 * Updates the itemStack
 * @param {ItemStack} itemStack
 */
Inventory.prototype.update = function(itemStack) {
    if(!(itemStack instanceof ItemStack)) {
        throw new Error("Invalid Argument Exception: Item is not instance of itemStack");
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
    for(var itemStack in itemStacks) {
        this.add(itemStack);
    }
};

/**
 * Removes the array of items
 * @param {Array} itemStacks
 */
Inventory.prototype.removeAll = function(itemStacks) {
    for(var itemStack in itemStacks) {
        this.remove(itemStack);
    }
};

/**
 * The items to update.
 * @param {Array} itemStacks
 */
Inventory.prototype.updateAll = function(itemStacks) {
    for(var itemStack in itemStacks) {
        this.update(itemStack);
    }
};

/**
 * To String
 * @returns {*|String}
 */
Inventory.prototype.toString = function () {
    return this.itemStacks.toString();
};

module.exports = Inventory;