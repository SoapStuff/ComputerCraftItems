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
        local detail = state.interface.getItemDetail(stacks[i]["fingerprint"]);
        table.insert(itemList,detail);
    end
    local args = {
        action = "set",
        items = itemList
    }
    postdata = textutils.serialiseJSON(args,true);
    http.post(state.URL .. "/sendItems","request= " .. textutils.urlEncode(postdata));
end

