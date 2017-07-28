/**
 * Created by Arjan on 26-7-2017.
 */

/**
 * This is a simple serializer that converts an object to a serialized LUA table.
 * This does not handle circular references!
 * @param object
 * @returns {string} The serialized lua string.
 */
function serializeToLuaTable(object) {
    if(object instanceof Array) {
        return serializeToLuaArray(object);
    }
    var result = "{";
    var hasAttribute = false;
    for (var k in object) {
        hasAttribute = true;
        result += " " + k + " = ";
        if(object.hasOwnProperty(k)) {
            var type = typeof object[k];
            switch (type) {
                case "string": {
                    result += "\"" + object[k] + "\"";
                    break;
                }
                case "number":
                case "boolean": {
                    result += object[k];
                    break;
                }
                case "object":
                default: {
                    if (object[k] instanceof Array) {
                        result += serializeToLuaArray(object[k]);
                        break;
                    } else {
                        result += serializeToLuaTable(object[k]);
                    }
                    break;
                }
            }
        }
        result += ","
    }
    if(hasAttribute) {
        result = result.substr(0,result.length-1);
    }
    result += "}";
    return result;
}

/**
 * Serializes an array to a Lua Array.
 * @link(serializeToLuaTable)
 * @param array
 * @return {string}
 */
function serializeToLuaArray(array) {
    var result = "{";
    for(var i = 0; i < array.length; i++) {
        var type = typeof array[i];
        switch (type) {
            case "string":
                result += "\"" + array[i] + "\"";
                break;
            case "number":
            case "boolean":
                result += array[i];
                break;
            case "object":
            default:
                if (array[i] instanceof Array) {
                    result += serializeToLuaArray(array[i]);
                    break;
                } else {
                    result += serializeToLuaTable(array[i]);
                }
                break;
        }

        if(i !== array.length - 1) {
            result += ",";
        }
    }
    result += "}";
    return result;
}

module.exports.serializeToLuaTable = serializeToLuaTable;
module.exports.serializeToLuaArray = serializeToLuaArray;