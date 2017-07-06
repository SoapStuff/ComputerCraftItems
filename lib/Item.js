/**
 * Created by Arjan on 6-7-2017.
 */

var ItemStack = function(mod_id,dmg,qty,id,display_name,name) {
    this.mod_id = mod_id;
    this.dmg = dmg;
    this.qty = qty;
    this.id =id;
    this.display_name = display_name;
    this.name = name;
};

ItemStack.prototype.constructor = ItemStack;

ItemStack.prototype.equals = function(that) {
    if(!(that instanceof ItemStack)) return false;
    return this.display_name === that.display_name && this.dmg === that.dmg;
}

module.exports.ItemStack = ItemStack;