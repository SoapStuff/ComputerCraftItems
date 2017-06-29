--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:24
-- To change this template use File | Settings | File Templates.
--

function containsItem(itemName,data,state)
    -- Returns a object with amount and the data-id of the object.
    local stacks = state.interface.getAvailableItems()
    for i=1,#stacks do
        local fingerprint = stacks[i]["fingerprint"]
        if (fingerprint["id"] == itemName and (fingerprint["dmg"] == data or data == -1)) then
            return {amount= stacks[i]["size"], data = fingerprint["dmg"]};
        end
    end
    -- No items found
    return {amount = -1, data = data}
end

function exportItem(itemName,amount,data,state)
    local contains = containsItem(itemName,data,state)
    item = {
        id = itemName,
        dmg = contains["data"]
    }
    -- Export the item
    if  contains["amount"] > 0 then
        pcall(function()  state.interface.exportItem(item,state.exportDir,amount) end)
        local exportedAmount = 0
        if contains["amount"] < 64 then
            exportedAmount = contains["amount"]
        else
            exportedAmount = 64;
        end
        return exportedAmount
    end
    return -1
end

function exportItemAmount(itemName,amount,data,state)
    local initAmount = amount;
    while amount > 0 do
        local removed = exportItem(itemName,amount,data,state)
        if(removed == 0 or removed == -1) then
            print("Exported" .. (initAmount - amount))
            print(item["id"] .. "-->" .. item["dmg"])
            return initAmount - amount
        end
        amount = amount - removed
    end
end

