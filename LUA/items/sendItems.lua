--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:19
-- To change this template use File | Settings | File Templates.
--
local URL = "http://localhost:3000";
local interface = peripheral.wrap("back");

-- Encode the paramaters and make a post request.
-- @Param args, object that needs to be sent to the server.
function httpPost(args)
    local postdata = textutils.serialiseJSON(args,true);
    http.post(URL .. "/sendItems","request= " .. textutils.urlEncode(postdata));
end

-- Send all the items in the interface to the host.
function sendItems(itemList)
    local args = {
        action = "set",
        items = itemList
    }
    httpPost(args);
end

-- Update the quantity of an item to the webserver
-- @Param addItems - Items to add
-- @Param removeItems - items to remove
-- @Param updateItems - items to update
function update(addItems,removeItems,updateItems)
    local args = {
        action = "update",
        addItems = addItems,
        removeItems = removeItems,
        updateItems = updateItems
    }
    if #addItems ~= 0 or #removeItems ~= 0 or #updateItems ~= 0 then
        print("Updating:")
        print("Added " .. #addItems .. " items")
        print("Removed " .. #removeItems .. " items")
        print("Updated " .. #updateItems .. " items")
        httpPost(args);
    end
end

-- Checks whether the new Item equals the old item and returns the difference in quantity
-- Returns a table with equal and amount difference:
-- { equals = <true/false> diff = <int> }
-- @Param oldItem
-- @Param newItem
function itemEquals(oldItem,newItem)
    local equals = oldItem["id"] == newItem["id"] and oldItem["dmg"] == newItem["dmg"]
    local diff = newItem["qty"] - oldItem["qty"]
    return {equals = equals, diff = diff}
end

-- Check the differences between the old state and the new state. Update the webserver accordingly.
-- @Param oldItems
-- @Param newItems
function updateItems(oldItems,newItems)
    -- Item Lists
    local updateList ={};
    local removeList = {};
    local addList = {}

    -- Add or update item
    for i=1,#newItems do
        local found = false;

        for j=1,#oldItems do
            local data = itemEquals(oldItems[j],newItems[i])
            if data["equals"] == true then
                found = true;
                if data["diff"] ~= 0 then
                    -- These items should be updated
                    table.insert(updateList,newItems[i]);
                end
                -- Item found stop the inner loop
                break;
            end
        end
        -- Outer loop add if item not found
        if found == false then
            table.insert(addList,newItems[i]);
        end
    end

    -- Find if old items are no longer present.
    for j=1,#oldItems do
        local found = false;
        for i=1,#newItems do
            local data = itemEquals(oldItems[j],newItems[i])
            if data["equals"] == true then
                found = true;
                break
            end
        end
        if found == false then
            table.insert(removeList,oldItems[j]);
        end
    end
    -- Update the items
    update(addList,removeList,updateList);
end

-- Monitor the items every tick.
function monitorItems(getItems)
    local oldItems = getItems();
    sendItems(oldItems)
    while true do
        local newItems = getItems();
        sleep(1)
        updateItems(oldItems,newItems)
        oldItems = newItems;
    end
end