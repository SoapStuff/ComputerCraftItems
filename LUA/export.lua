--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:24
-- To change this template use File | Settings | File Templates.
--

local interfaceSide = "left"
local chestFace = "UP"

local interface = peripheral.wrap(interfaceSide)

function containsItem(itemName,data)
    local stacks = interface.getAvailableItems()
    for i=1,#stacks do
        local fingerprint = stacks[i]["fingerprint"]
        if (fingerprint["id"] == itemName and (fingerprint["dmg"] == data or data == -1)) then
            return {amount= stacks[i]["size"], data = fingerprint["dmg"]};
        end
    end
    return {amount = -1, data = data}
end

function exportItem(itemName,amount,data)
    local contains = containsItem(itemName,data)
    item = {
        id = itemName,
        dmg = contains["data"]
    }
    if  contains["amount"] > 0 then
        pcall(function()  endinterface.exportItem(item,chestFace,amount) end)
        local exportedAmount = 0
        if contains["amount"] < 64 then
            exportedAmount = contains["amount"]
        else
            exportedAmount = 64;
        end
        return exportedAmount
    end
    return "Item not found"
end

function exportItemAmount(itemName,amount,data)
    local initAmount = amount;
    while amount > 0 do
        local removed = exportItem(itemName,amount,data)
        if(removed == 0 or removed == "Item not found" or type(removed) ~= "number") then
            return initAmount - amount
        end
        amount = amount - removed
        sleep(0.1)
    end
end

