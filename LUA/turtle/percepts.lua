--
-- Created by IntelliJ IDEA.
-- User: Stijn
-- Date: 01/07/2017
-- Time: 23:41
-- To change this template use File | Settings | File Templates.
--

function rsPercepts()
    local left = rs.getAnalogInput("left")
    local right = rs.getAnalogInput("right")
    local front = rs.getAnalogInput("top")
    local back = rs.getAnalogInput("back")
    local bottom = rs.getAnalogInput("bottom")
    local top = rs.getAnalogInput("top")
    return left, right, front, back, bottom, top
end

function blockPercepts()
    local front = turtle.detect()
    local top = turtle.detectUp()
    local bot = turtle.detectDown()
    return front, top, bot
end

function fuelPercpets()
    local fuelLevel = turtle.getFuelLevel()
    local fuelLimit = turtle.getFuelLimit()
    return fuelLevel, fuelLimit
end

function sendPercepts(url)
    local leftRS, rightRS, frontRS, backRS, bottomRS, topRS = rsPercepts()
    local frontBlock, topBlock, botBlock = blockPercepts()
    local fuelLevel, fuelLimit = fuelPercpets()
    local content = "/rsPercepts"
    local request
    local nextAction = false

    content = content .. "?leftRS=" .. leftRS
    content = content  .. "&rightRS=" .. rightRS
    content = content .. "&frontRS=" .. frontRS
    content = content ..  "&backRS=" .. backRS
    content = content .. "&bottomRS=" .. bottomRS
    content = content .. "&topRS=" .. topRS

    request = url .. content
    nextAction = (http.get(request).readLine() ~= "nil") or (nextAction)

    content = "/blockPercepts"

    content = content .. "?frontBlock=" .. frontBlock
    content = content .. "&topBlock=" .. topBlock
    content = content .. "&botBlock=" .. botBlock

    request = url .. content
    nextAction = (http.get(request).readLine() ~= "nil") or (nextAction)

    content = "/fuelLevel"

    content = content .. "?fuelLevel=" .. fuelLevel
    content = content .. "&fuelLimit=" .. fuelLimit

    request = url .. content
    nextAction = (http.get(request).readLine() ~= "nil") or (nextAction)

    return nextAction
end
