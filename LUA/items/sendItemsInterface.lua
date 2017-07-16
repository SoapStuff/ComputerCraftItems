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
    local stacks = interface.getAvailableItems()
    local itemList = {};
    for i=1,#stacks do
        local detail = interface.getItemDetail(stacks[i]["fingerprint"],false);
        table.insert(itemList,detail);
    end
    return itemList;
end

function monitor()
    sendItems.monitorItems(getItems,"MeInterface");
end

monitor();
