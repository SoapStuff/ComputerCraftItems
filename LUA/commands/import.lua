--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:21
-- To change this template use File | Settings | File Templates.
--

function importItem(itemName,amount,data,state)
    local index = -1
    -- Empty the enderchest
    if itemName == "all" then
        for i = 1,27 do
            state.enderchest.pushItem(state.importDir,i,64)
        end
        return 0
    end
    -- Find the item and import it.
    for i=1,27 do
        local itemInSlot = state.enderchest.getStackInSlot(i)
        if itemInSlot and itemInSlot["id"] == itemName and (itemInSlot["dmg"] == data or data == -1)then
            print("Imported:")
            print(itemInSlot["id"] .. "-->" .. itemInSlot["dmg"])
            index = i
            break
        end
    end
    -- Export the item
    if index > 0 then
        return state.enderchest.pushItem(state.importDir,index,amount)
    end
    return -1;
end

function importItemAmount(itemName,amount,data,state)
    local initAmount = amount;
    -- Remove amount
    while amount > 0 do
        local removed = importItem(itemName,amount,data,state)
        -- Check if there where items removed
        if(removed == 0 or removed == -1) then
            return initAmount - amount
        end
        -- Remaining amount
        amount = amount - removed
    end
end

