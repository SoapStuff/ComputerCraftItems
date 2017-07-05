--
-- Created by IntelliJ IDEA.
-- User: Stijn
-- Date: 01/07/2017
-- Time: 23:39
-- To change this template use File | Settings | File Templates.
--

local url = "http://wyvern.xyz:5300"
local request = url .. "/connectTurtle?id="
local id = os.getComputerID()
request = request .. id
id = http.get(request).readLine()

os.loadAPI("disk/percepts")
os.loadAPI("disk/actions")

while true do
    if (percepts.sendPercepts(url)) then
        actions.getAction()
    end
    os.sleep(5)
end