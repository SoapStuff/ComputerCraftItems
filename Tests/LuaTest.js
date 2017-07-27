/**
 * Created by Arjan on 26-7-2017.
 */

const assert = require("assert");
const serializeToLua = require("../lib/Lua");
module.exports.test1 = function () {
    var object = { key : 1};
    var string = "{ key = 1 }".replace(/\s+/g, "");
    var result = serializeToLua(object).replace(/\s+/g, "");
    assert.equal(result,string,"Expected : " + string + " But was : " + result);
    return true;
};

module.exports.test2 = function() {
    var object = { key : "string"};
    var string = "{ key = \"string\" }".replace(/\s+/g, "");
    var result = serializeToLua(object).replace(/\s+/g, "");
    assert.equal(result,string,"Expected : " + string + " But was : " + result);
    return true;
};

module.exports.test3 = function() {
    var object = { key : false};
    var string = "{ key = false }".replace(/\s+/g, "");
    var result = serializeToLua(object).replace(/\s+/g, "");
    assert.equal(result,string,"Expected : " + string + " But was : " + result);
    return true;
};

module.exports.test4 = function() {
    var object = { key : [1,"string",false]};
    var string = "{ key = {1,\"string\",false} }".replace(/\s+/g, "");
    var result = serializeToLua(object).replace(/\s+/g, "");
    assert.equal(result,string,"Expected : " + string + " But was : " + result);
    return true;
};

module.exports.test5 = function() {
    var object = { key : {
        innerKey: [1,2,3,4]
    }};
    var string = "{ key = { innerKey = {1,2,3,4} }}".replace(/\s+/g, "");
    var result = serializeToLua(object).replace(/\s+/g, "");
    assert.equal(result,string,"Expected : " + string + " But was : " + result);
    return true;
};