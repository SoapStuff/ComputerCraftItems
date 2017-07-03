--
-- Created by IntelliJ IDEA.
-- User: xka
-- Date: 2-7-2017
-- Time: 22:38
-- To change this template use File | Settings | File Templates.
--
function pullItems(state)
    for i=1,27 do
        state.enderChest.pullItem(state.pullDir,i,64);
    end
end

