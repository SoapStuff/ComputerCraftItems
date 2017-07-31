--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 13-7-2017
-- Time: 19:07
-- To change this template use File | Settings | File Templates.
--
os.loadAPI("sendItems")
local enderchest = peripheral.wrap("right");

function getItems()
    return enderchest.getAllStacks(false);
end

function monitor()
    sendItems.monitorItems(getItems,"EnderChest");
end

monitor();

