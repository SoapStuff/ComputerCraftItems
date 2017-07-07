--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:19
-- To change this template use File | Settings | File Templates.
--
function sendItems(state)
    local stacks = state.interface.getAvailableItems()
    local itemList = {};
    for i=1,#stacks do
        local detail = state.interface.getItemDetail(stacks[i]);
        itemList.insert(detail);
    end
    local arguments = {
        action = "set",
        items = itemList
    }
    http.post(state.URL .. "/sendItems",arguments);
end

