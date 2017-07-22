/**
 * Created by Arjan on 6-7-2017.
 */

/**
 *
 * @param mod_id
 * @param dmg
 * @param qty
 * @param id
 * @param display_name
 * @param name
 * @param nbt
 * @constructor
 */
var ItemStack = function(mod_id,dmg,qty,id,display_name,name,nbt) {
    this.mod_id = mod_id;
    this.dmg = dmg;
    this.qty = qty;
    this.id =id;
    this.display_name = display_name;
    this.name = name;
    //TODO We want a better way of how we handle misc nbt tags.
    this.nbt = nbt !== undefined ? nbt : null;
};

ItemStack.prototype.constructor = ItemStack;

/**
 * Converts an json to an itemStack or throws an error when not all attributes are present
 * @param json
 * @return {ItemStack}
 */
ItemStack.cast = function(json) {
    if(json instanceof ItemStack) return json;
    if(!(json.mod_id !== undefined &&
        json.dmg !== undefined &&
        json.qty !== undefined &&
        json.id !== undefined &&
        json.display_name !== undefined &&
        json.name !== undefined )) {
        throw new Error("Invalid Argument Exception: Item is not instance of itemStack" + JSON.stringify(json));
    }
    return new ItemStack(json.mod_id,json.dmg,json.qty,json.id,json.display_name,json.name,json);
};

ItemStack.prototype.equals = function(that) {
    if(!(that instanceof ItemStack)) return false;
    return this.display_name === that.display_name && this.dmg === that.dmg;
};

module.exports = ItemStack;