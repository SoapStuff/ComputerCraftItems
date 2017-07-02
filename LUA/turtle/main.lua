--
-- Created by IntelliJ IDEA.
-- User: Stijn
-- Date: 01/07/2017
-- Time: 23:39
-- To change this template use File | Settings | File Templates.
--

local request = "http://wyvern.xyz:5300/connectTurtle?id="
local id = os.getComputerID()
request = request .. id
id = http.get(request).readLine()

local percepts = os.loadAPI("disk/percepts")
