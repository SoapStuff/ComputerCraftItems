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