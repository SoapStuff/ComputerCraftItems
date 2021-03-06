--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:19
-- To change this template use File | Settings | File Templates.
--
local URL = "http://localhost:3000";
local bucketSize = 63;

local debug = false;
local log = false;

-- Update the items periodicly.
-- @Param getItems - the getItems function
-- @Param inventory - the inventory
function monitorItems(getItems,inventory)
    init(getItems,inventory);

    -- Add all the items.
    local oldItems = getItems()

    -- Monitor
    while true do
        if debug then
            local event, key = os.pullEvent( "key" );
            if key == keys.e then
                logger("");
                logger("Starting loop at: "..os.clock())
                local newItems = getItems();
                -- Monitor Changes
                local succes = updateItems(oldItems,newItems,inventory);
                if not succes then
                    pingServer(getItems,inventory)
                end
                oldItems = newItems;
            end
        else
            logger("");
            logger("Starting loop at: "..os.clock())
            local newItems = getItems();
            -- Monitor Changes
            local succes = updateItems(oldItems,newItems,inventory);
            oldItems = newItems;
            if not succes then
                pingServer(getItems,inventory)
            end
            sleep(1)
        end
    end
end

function init(getItems,inventory)
    -- Intialize the network on the server.
    local response = httpPost({command = "clear", inventory = inventory})
    if not response then
        pingServer(getItems,inventory);
    end;
    sendItemRequest("add",getItems(),inventory);
end

-- Ping the server untill it is online.
-- Then Intialize the items.
function pingServer(getItems,inventory)
    print("Server Offline Waiting for server to come back online");
    while true do
        print("Pinging Server at:" .. os.clock());
        local ping = http.get(URL.."/ping");
        if ping then
            print("Connected to server!");
            init(getItems,inventory);
            break;
        end;
        sleep(5);
    end;
end

-- Encode the paramaters and make a post request.
-- @Param args, object that needs to be sent to the server.
function httpPost(args)
    local postdata = textutils.serialiseJSON(args,true);
    local response = http.post(URL .. "/sendItems","json= " .. textutils.urlEncode(postdata));
    if response then
        return response.readLine();
    else
        return nil;
    end
end

-- Sends the items and the action to the server.
-- @Param action <add|remove|update>
-- @Param items {itemStack...}
-- @Param inventory <meInterface|enderchest>
function sendItemRequest(command,items,inventory)
    local buckets = math.ceil(#items / bucketSize);
    logger("  Send Items Request. " .. command .. #items .. "items in" .. buckets .. "buckets.");
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
                print("Lost connection");
                return false;
            end
        end
    elseif buckets == 1 then
        local response = httpPost({ command = command, inventory = inventory, itemlist = items });
        if not response then
            print("Lost Connection");
            return false;
        end;
    end;
    return true;
end

-- Checks whether the new Item equals the old item and returns the difference in quantity
-- Returns a table with equal and amount difference:
-- { equals = <true/false> diff = <int> }
-- @Param oldItem
-- @Param newItem
function itemEquals(oldItem,newItem)
    local equals = oldItem.id == newItem.id and oldItem.dmg == newItem.dmg and oldItem.display_name == newItem.display_name;
    local diff = newItem.qty - oldItem.qty
    return equals,diff;
end

-- Check the differences between the old state and the new state. Update the webserver accordingly.
-- @Param oldItems
-- @Param newItems
-- @Param inventory - EnderChest or MeInterface
function updateItems(oldItems,newItems,inventory)
    -- Item Lists
    logger("Updating items at" .. os.clock());
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
    logger(" Updating Request at: " .. os.clock());
    logger(" Previous amount of items: "..#oldItems);
    logger(" New amount of items:  "..#newItems)
    logger(" Added item amount: " .. #addList);
    logger(" Removed item amount: " .. #removeList);
    logger(" Updated item amount: " .. #updateList);

    local succes = sendItemRequest("add",addList,inventory) and
    sendItemRequest("remove",removeList,inventory) and
    sendItemRequest("update",updateList,inventory);

    logger(" Updating Done at: " .. os.clock());
    return succes;
end

function logger(string)
    if log then
        print(string);
    end
end