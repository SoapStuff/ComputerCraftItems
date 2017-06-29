--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:21
-- To change this template use File | Settings | File Templates.
--

local chestSide = "bottom"
local chestFace = "WEST"

local enderchest = peripheral.wrap(chestSide)

function importItem(itemName,amount,data)
    item = {
        id = itemName,
        dmg = data
    }
    local index = -1
    if itemName == "all" then
        for i = 1,27 do
            enderchest.pushItem(chestFace,i,64)
        end
        return 0
    end
    for i=1,27 do
        local itemInSlot = enderchest.getStackInSlot(i)
        if itemInSlot and itemInSlot["id"] == itemName then
            index = i
            break
        end
    end
    if index > 0 then
        return enderchest.pushItem(chestFace,index,amount)
    end
    return "Item not found"
end

function importItemAmount(itemName,amount,data)
    local initAmount = amount;
    while amount > 0 do
        local removed = importItem(itemName,amount,data)
        if(removed == 0 or removed == "Item not found") then
            return initAmount - amount
        end
        amount = amount - removed
        sleep(0.1)
    end
end

