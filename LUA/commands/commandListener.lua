--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:45
-- To change this template use File | Settings | File Templates.
--
os.loadAPI("import")
os.loadAPI("export")
os.loadAPI("craft")

function pollCommand(state)
    local response = http.get(state["URL"] .. "/getCommand")
    if response then
        local string = response.readLine();
        if string and string ~= 'nil' then
            local res = textutils.unserialise(string);
            if res["command"] and res["itemid"] and res["amount"] and res["dmg"] then
                local command = res["command"];
                local amount = res["amount"]
                local itemid = res["itemid"]
                local dmg = res["dmg"]
                if command == "craft" then
                    craft.requestCrafting(itemid,amount,dmg, state)
                elseif command == "export" then
                    export.exportItemAmount(itemid,amount,dmg, state)
                elseif command == "import" then
                    import.importItemAmount(itemid,amount,dmg, state)
                end
            end
        end

    end
end
