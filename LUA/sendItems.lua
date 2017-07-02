--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:19
-- To change this template use File | Settings | File Templates.
--
function sendItems(state)
    local stacks = state.interface.getAvailableItems()
    local string = "args="
    for i=1,#stacks do
        local stack = stacks[i]
        local fingerprint = stack["fingerprint"]
        string = string .. fingerprint["id"] .. ":"
        string = string .. fingerprint["dmg"] .. " "
        string = string .. stack["size"]
        if(i ~= #stacks) then
            string = string .. ","
        end
    end
    http.post(state.URL .. "/sendItems")
end

