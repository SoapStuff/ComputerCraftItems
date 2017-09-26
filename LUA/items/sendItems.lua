--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:19
-- To change this template use File | Settings | File Templates.
--
local URL = "http://localhost:3000";
local initialized = false;
local bucketSize = 63;


-- Update the items periodicly.
-- @Param getItems - the getItems function
-- @Param inventory - the inventory
function monitorItems(getItems,inventory)
    local response = httpPost({command = "clear", inventory = inventory})
    if not response then
        print("Server Offline");
        return;
    end

    local oldItems = getItems()
    sendItemRequest("add",oldItems,inventory);
    while true do
        local newItems = getItems();
        updateItems(oldItems,newItems,inventory);
        oldItems = newItems;
        sleep(1)
    end
end

-- Encode the paramaters and make a post request.
-- @Param args, object that needs to be sent to the server.
function httpPost(args)
    local postdata = textutils.serialiseJSON(args,true);
    local response = http.post(URL .. "/sendItems","json= " .. textutils.urlEncode(postdata));
    if response then
        return response.readLine();
    else
        initialized = false;
        return nil;
    end
end

-- Sends the items and the action to the server.
-- @Param action <add|remove|update>
-- @Param items {itemStack...}
-- @Param inventory <meInterface|enderchest>
function sendItemRequest(command,items,inventory)
    local buckets = math.ceil(#items / bucketSize);
    local ListItemlist = {}
    if buckets > 1 then
        for j=1,#items do
            local index = j % buckets + 1;
            if not ListItemlist[index] then
                ListItemlist[index] = {};
            end
            table.insert(ListItemlist[index],items[j]);
        end;
        for i = 1, buckets do
            local response = httpPost({ command = command, inventory = inventory, itemlist = ListItemlist[i] });
            if not response then
                print("Server offline");
            end
        end
    elseif buckets == 1 then
        httpPost({ command = command, inventory = inventory, itemlist = items });
    end;
end

-- Checks whether the new Item equals the old item and returns the difference in quantity
-- Returns a table with equal and amount difference:
-- { equals = <true/false> diff = <int> }
-- @Param oldItem
-- @Param newItem
function itemEquals(oldItem,newItem)
    local equals = oldItem["id"] == newItem["id"] and oldItem["dmg"] == newItem["dmg"]
    local diff = newItem["qty"] - oldItem["qty"]
    return equals,diff;
end

-- Check the differences between the old state and the new state. Update the webserver accordingly.
-- @Param oldItems
-- @Param newItems
-- @Param inventory - EnderChest or MeInterface
function updateItems(oldItems,newItems,inventory)
    -- Item Lists
    local updateList ={};
    local removeList = {};
    local addList = {}

    -- Add or update item
    for i=1,#newItems do
        local found = false;

        for j=1,#oldItems do
            local equals,diff = itemEquals(oldItems[j],newItems[i])
            if equals == true then
                found = true;
                if diff ~= 0 then
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
            local equals, diff = itemEquals(oldItems[j],newItems[i])
            if equals == true then
                found = true;
                break
            end
        end
        if found == false then
            table.insert(removeList,oldItems[j]);
        end
    end
    -- Update the items
    sendItemRequest("add",addList,inventory);
    sendItemRequest("remove",removeList,inventory);
    sendItemRequest("update",updateList,inventory);
end