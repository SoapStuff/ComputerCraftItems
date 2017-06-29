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
    local response = http.get(state["url"] .. "/getCommand")
    if response then
        local res = textutils.unserialise(response.readLine());
        local command = res["command"];
        local args = res["args"];
        if command == "craft" then
            craft.requestCrafting(args[1], args[2], args[3],state)
        elseif command == "export" then
            export.exportItemAmount(args[1], args[2], args[3],state)
        elseif command == "import" then
            import.importItemAmount(args[1], args[2], args[3],state)
        end
    end
end
