--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:17
-- To change this template use File | Settings | File Templates.
--

local interfaceside = "bottom"
local interface = peripheral.wrap(interfaceside)

function requestCrafting(itemName,amount,data)
    item = {
        id = itemName,
        dmg = data
    }
    interface.requestCrafting(item,amount)
end