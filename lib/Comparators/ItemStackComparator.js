/**
 * Created by Arjan on 12-7-2017.
 */
const StringComparator = require("./StringComparator").compare;
/**
 * Compares two items first on Display Name then on DMG value.
 * @param ItemStack1
 * @param ItemStack2
 * @returns {number}
 */
module.exports.compare = function(ItemStack1,ItemStack2) {
    var compareName = StringComparator(ItemStack1.display_name,ItemStack2.display_name);
    if (compareName !== 0) return compareName;
    return ItemStack1.dmg - ItemStack2.dmg;
};