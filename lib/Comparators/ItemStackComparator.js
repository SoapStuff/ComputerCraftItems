/**
 * Created by Arjan on 12-7-2017.
 */
const StringComparator = require("./StringComparator").compare;
const ItemStack = require("../Items/ItemStack");
/**
 * Compares two items first on Display Name then on DMG value.
 * @param ItemStack1
 * @param ItemStack2
 * @returns {number}
 */
module.exports.compare = function(ItemStack1,ItemStack2) {
    if(!(ItemStack1 instanceof ItemStack && ItemStack2 instanceof ItemStack)) {
        throw new Error("This is not a valid ItemStack");
    }
    var comp = StringComparator(ItemStack1.display_name,ItemStack2.display_name);
    return comp !== 0 ? comp : ItemStack1.dmg - ItemStack2.dmg;
};