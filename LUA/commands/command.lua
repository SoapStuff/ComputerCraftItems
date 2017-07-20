--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:24
-- To change this template use File | Settings | File Templates.
--

-- Global Variables
local arg = { ... }
local URL = "http://localhost:3000"

-- Encode the paramaters and make a post request.
-- @Param args, object that needs to be sent to the server.
function httpPost(args)
    local postdata = textutils.serialiseJSON(args,true);
    return http.post(URL .. "/addCommand","json= " .. textutils.urlEncode(postdata));
end

-- Returns a valid command table or nill
-- @param arg, the arguments
function validCommand(arg)
    local commands = {import = true,export = true};
    if commands[arg[1]] then
        return {
            command = arg[1],
            item = arg[2],
            amount = arg[3],
            dmg = arg[4]
        }
    end
    return nil;
end

-- Send command to server
function execute()
    local command = validCommand(arg)
    if command then
        print(httpPost(command).readLine());
    else
        print("Command was invalid")
    end
end
execute();