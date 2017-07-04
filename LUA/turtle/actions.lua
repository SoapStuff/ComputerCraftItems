--
-- Created by IntelliJ IDEA.
-- Userthen Stijn
-- Datethen 03/07/2017
-- Timethen 01then09
-- To change this template use File | Settings | File Templates.
--
local id = os.getComputerID()
local ip = "http://wyvern.xyz:5300/"
local request = ip .. "getAction?id=" .. id
local resolve = ip .. "resolveAction?id=" .. id .. "&action="

function resolveAction(resolve, action, performed)
    if (performed) then
        print("Action " .. action .. " performed")
        local resolved = http.get(resolve .. action).readLine()
        if (resolved == "true") then
            print("Action resolved")
        else
            print("Action not resolved")
        end
    else
        print("Action " .. action .. " not performed")
    end
    return performed
end

function handleAction(resolve, action)
    if (action == "turnLeft") then
        return resolveAction(resolve, action, turtle.turnLeft())
    end
    if (action == "turnRight") then
        return resolveAction(resolve, action, turtle.turnRight())
    end
    if (action == "moveUp") then
        return resolveAction(resolve, action, turtle.up())
    end
    if (action == "moveDown") then
        return resolveAction(resolve, action, turtle.down())
    end
    if (action == "moveBack") then
        return resolveAction(resolve, action, turtle.back())
    end
    if (action == "moveForward") then
        return resolveAction(resolve, action, turtle.forward())
    end
    if (action == "attackForward") then
        return resolveAction(resolve, action, turtle.attack())
    end
    if (action == "attackDown") then
        return resolveAction(resolve, action, turtle.attackDown())
    end
    if (action == "attackUp") then
        return resolveAction(resolve, action, turtle.attackUp())
    end
    if (action == "digForward") then
        return resolveAction(resolve, action, turtle.dig())
    end
    if (action == "digDown") then
        return resolveAction(resolve, action, turtle.digDown())
    end
    if (action == "digUp") then
        return resolveAction(resolve, action, turtle.digUp())
    end
    if (action == "placeForward") then
        return resolveAction(resolve, action, turtle.place())
    end
    if (action == "placeDown") then
        return resolveAction(resolve, action, turtle.placeDown())
    end
    if (action == "placeUp") then
        return resolveAction(resolve, action, turtle.placeUp())
    end
    if (action == "dropForward") then
        return resolveAction(resolve, action, turtle.drop())
    end
    if (action == "dropDown") then
        return resolveAction(resolve, action, turtle.dropDown())
    end
    if (action == "dropUp") then
        return resolveAction(resolve, action, turtle.dropUp())
    end
end

function getAction()
    local response = http.get(request).readLine()

    if (response == "nil") then
        print("No action found")
        return false
    else
        print("Action " .. response .. " found")
        return handleAction(resolve, response)
    end
end
