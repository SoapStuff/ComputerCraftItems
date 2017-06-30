--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:58
-- To change this template use File | Settings | File Templates.
--
function requestCrafting(itemName,amount,data,state)
    item = {
        id = itemName,
        dmg = data
    }
    state.interface.requestCrafting(item,amount)
end

