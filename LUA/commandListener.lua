--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:15
-- To change this template use File | Settings | File Templates.
--
local url = "http://localhost:5000/getCommand?command=craft"
local request = "export"
os.loadAPI("craft")
while true do
    local response = http.get(url,"command=" .. textutils.urlEncode(request))
    if response then
        local responseString = response.readLine()
        local lua = textutils.unserialise(responseString)
        if lua["command"] == "craft" then
            craft.requestCrafting(lua["args"][1],lua["args"][2],lua["args"][3])
        end
        if lua["command"] == "export" then
            export.exportItemAmount(lua["args"][1],lua["args"][2],lua["args"][3])
        end
    end
    sleep(1)
end

