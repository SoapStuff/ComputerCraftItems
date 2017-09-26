--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 13-7-2017
-- Time: 19:07
-- To change this template use File | Settings | File Templates.
--
os.loadAPI("sendItems");
local interface = peripheral.wrap("back");

-- This function returns an basic version of the item in the ME System
-- Item Structure : {mod_id,dmg,qty,id,display_name,name}
function getItems()
    local items = {};
    local stacks = interface.getAvailableItems(3);
    for i=1,#stacks do
        local item = stacks[i]["item"];
        item.is_fluid = stacks[i].is_fluid;
        item.is_item = stacks[i].is_item;
        item.is_craftable = stacks[i].is_craftable;
        table.insert(items,item);
    end
    return items
end

function monitor()
    sendItems.monitorItems(getItems,"MeInterface");
end

monitor();
