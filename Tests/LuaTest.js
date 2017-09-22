/**
 * Created by Arjan on 26-7-2017.
 */

const assert = require("assert");
const serializeToLua = require("../lib/Helpers/Lua").serializeToLuaTable;
require("simple-tests-js").run({
    serializer: {
        test: function (input, expected) {
            var result = serializeToLua(input).replace(/\s+/g, "");
            assert.equal(result, expected.replace(/\s+/g, ""), "Expected: " + expected + "But was : " + result);
        },
        parameters: [
            [{key: 1}, "{key=1}"],
            [{key: "string"}, "{key =\"string\"}"],
            [{key: false}, "{key=false}"],
            [{key: [1, "string", false]}, "{ key = {1,\"string\",false} }"],
            [{key: {innerKey: [1, 2, 3, 4]}}, "{ key = { innerKey = {1,2,3,4} }}"],
            [[[1,2,3],{key: 1}],"{{1,2,3},{key = 1}}"],
            [{key : 1, func: function() {return false;}},"{key=1}"]
        ]
    }
}, "LuaTest");