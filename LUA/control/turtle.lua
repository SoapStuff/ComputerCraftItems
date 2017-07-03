--
-- Created by IntelliJ IDEA.
-- User: Stijn
-- Date: 03/07/2017
-- Time: 02:14
-- To change this template use File | Settings | File Templates.
--
local args = { ... }
local request = "http://wyvern.xyz:5300/getTurtleIDList"

local turtleList = http.get(request).readLine()
local turtleID

for i in string.gmatch(turtleList, "%d+") do
    turtleID = i
    break
end

local action = args[1]
local actionRequest = "http://wyvern.xyz:5300/addAction?id=" .. turtleID .. "&action=" .. action

print(http.get(actionRequest).readLine())
