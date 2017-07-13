--
-- Created by IntelliJ IDEA.
-- User: Arjan
-- Date: 29-6-2017
-- Time: 19:17
-- To change this template use File | Settings | File Templates.
--

local args = { ... }
local url = "http://wyvern.xyz:5432/getItems?string=" .. args[1]
local items = http.get(url).readLine()
local list = {}
if (items) then
    for word in items.gmatch(items, '([^,]+)') do
        table.insert(list, word)
    end
    local start = ((args[2] - 1) * 7) + 1;
    local end_ = math.min(#list, start + 6);
    for i = start, end_ do
        print(list[i])
        print("")
    end
end

