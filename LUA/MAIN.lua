--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:45
-- To change this template use File | Settings | File Templates.
--
local URL = "http://localhost:5432";
local interface = peripheral.wrap("bottom");
local enderchest = peripheral.wrap("right");
local importDir = "UP";
local exportDir = "EAST";
local state = {
    URL = URL,
    interface = interface,
    enderchest = enderchest,
    exportDir = exportDir,
    importDir = importDir
}
os.loadAPI("commandListener")
os.loadAPI("sendItems")
while true do
    commandListener.pollCommand(state);
    sendItems.sendItems(state);
    sleep(1);
end


