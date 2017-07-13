/**
 * Created by Arjan on 1-7-2017.
 */

/**
 * Compares two strings.
 *
 * @param string1
 * @param string2
 * @returns {number} Returns if the strings are the same size, left is smaller, or right is smaller
 */
module.exports.compare = function(string1,string2) {
    if(string1.toLowerCase() > string2.toLowerCase()) {
        return 1
    }
    if(string1.toLowerCase() < string2.toLowerCase()) {
        return -1
    }
    return 0;
};