--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:24
-- To change this template use File | Settings | File Templates.
--

local arg = { ... }
local request = "http://localhost:5000/addCommand?command="
request = request .. arg[1] .. "&args=\"" .. arg[2] .. "\",";
for i=3,#arg do
    request = request .. arg[i];
    if(i ~= #arg) then
        request = request .. ","
    end
end
print(request)
print(http.get(request))

