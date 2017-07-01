/**
 * Created by Arjan on 1-7-2017.
 */
module.exports.comparator = function(string1,string2) {
    if(string1.toLowerCase() > string2.toLowerCase()) {
        return 1
    }
    if(string1.toLowerCase() < string2.toLowerCase()) {
        return -1
    }
    return 0;
}